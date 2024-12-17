using Cars.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using Cars.Application.Cars;
using FluentValidation.AspNetCore;
using FluentValidation;
using Cars.API;
using Cars.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

// konfiguracja aplikacji i rejestracja serwis�w
// Jest to miejsce, gdzie definiuje si�, jak aplikacja ma by� uruchamiana i jakie komponenty
// b�d� dost�pne w czasie dzia�ania.
// Program.cs konfiguruje serwisy, �rodowisko uruchomieniowe i pipeline obs�ugi ��da� HTTP.


// Inicjalizacja aplikacji
// obiekt builder jest u�ywany do konfigurowania aplikacji (serwis�w, opcji, middleware itp.).
var builder = WebApplication.CreateBuilder(args);

// globalne wymuszenie autoryzacji dla wszystkich akcji kontroler�w w aplikacji.
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Create>();
builder.Services.AddIdentityServices(builder.Configuration);


// builder.Services - rejestracja serwis�w
// rejestracja kontroler�w
builder.Services.AddControllers();


// konfiguracja Swaggera
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));



// rejestracja kontekstu bazy danych
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});


// dodanie oraz konfiguracja serwisu polityki cors
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        // ufamy temu adresowi, niezele�nie od nag��wka lub metody (POST, PUT, etc.)
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
});


// budowanie i uruchamianie aplikacji
var app = builder.Build();


// Konfiguracja potoku HTTP
// uruchomienie dokumentacji Swaggera
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

// Middleware przekierowuj�cy HTTP na HTTPS, w celu zwi�kszenia bezpiecze�stwa
app.UseHttpsRedirection();

app.UseAuthentication();

// Konfiguracja middleware, kt�ry odpowiada za autoryzacj� u�ytkownik�w
app.UseAuthorization();


// Ta linia rejestruje trasy dla kontroler�w, aby aplikacja wiedzia�a,
// jak obs�ugiwa� konkretne ��dania HTTP na podstawie tras przypisanych w kontrolerach.
app.MapControllers();


// Tworzenie zakresu dla bazy danych i migracje
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
// pr�ba utworzenia bazy danych
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    // Przeprowadza migracje bazy danych. Je�eli istniej� jakie� zmiany w modelu danych,
    // zostan� one automatycznie zastosowane w bazie.
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}


// Uruchomienie aplikacji
app.Run();
