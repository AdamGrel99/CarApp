using Cars.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Cars.Infrastructure
{
    // DbContext jest podstawową klasą, która zarządza sesją z bazą danych i umożliwia wykonywanie operacji CRUD
    // na obiektach w bazie danych.
    // DbContext jest częścią Entity Framework Core. 
    // DataContext pełni funkcję pośrednika między aplikacją a bazą danych, zarządzając operacjami na encjach
    // i tabelach. Dzięki temu, że dziedziczy po DbContext, korzysta z wielu wbudowanych funkcji EF Core,
    // takich jak śledzenie zmian w obiektach, zarządzanie transakcjami oraz wykonywanie zapytań do bazy.
    // W czystej architekturze taka klasa jest umieszczona w warstwie Infrastructure, która odpowiada za
    // szczegóły techniczne, takie jak interakcja z bazą danych.
    public class DataContext : IdentityDbContext<AppUser>
    {
        // DbContextOptions jest specjalnym obiektem konfigurującym
        // Dzięki takiemu podejściu konfiguracja bazy danych (np. typ bazy danych, łańcuch połączenia) może być
        // definiowana zewnętrznie, np. w pliku konfiguracyjnym lub podczas uruchamiania aplikacji
        public DataContext(DbContextOptions options) : base(options) {}

        // Cars to nazwa tabeli w bazie danych
        // DbSet<Car> reprezentuje tę tabelę
        public DbSet<Car> Cars { get; set; }
    }
}
