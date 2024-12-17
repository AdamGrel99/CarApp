using Cars.Domain;
using Cars.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using System;
using MediatR;
using Cars.Application.Cars;
using Microsoft.AspNetCore.Authorization;

namespace Cars.API.Controllers
{
    public class CarsController : BaseApiController
    {
        private readonly IMediator _mediator;
        public CarsController(IMediator mediator)
        {
            _mediator = mediator;
        }


        // Task<ActionResult<List<Car>>> to typ zwracany przez metodę, który oznacza,
        // że metoda jest asynchroniczna (async) i zwraca wynik w postaci listy obiektów typu Car.
        // ActionResult pozwala na zwracanie różnych typów odpowiedzi, takich jak Ok(), NotFound()
        [HttpGet] // api/cars
        public async Task<ActionResult<List<Car>>> GetCars()
        {
            //return await _context.Cars.ToListAsync();
            var result = await _mediator.Send(new List.Query());
            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }


        // Atrybut [HttpGet("{id}")] oznacza, że ta metoda obsługuje żądania HTTP GET dla endpointu
        // /api/cars/{id}, gdzie {id} jest dynamiczną częścią URL (czyli identyfikatorem samochodu).
        // Parametr Guid id jest identyfikatorem samochodu, który będzie przekazywany w URL.ASP.NET Core
        // automatycznie przekazuje wartość z URL do tego parametru.
        [HttpGet("{id}")] // /api/cars/id
        public async Task<IActionResult> GetCar(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });

            if(result == null)
                return NotFound();
            if(result.IsSuccess &&  result.Value != null)
                return Ok(result.Value);
            if(result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }

        [HttpPost] // /api/cars
        public async Task<IActionResult> CreateCar(Car car)
        {
            var result = await Mediator.Send(new Create.Command { Car = car });
            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }

        [HttpPut("{id}")] // /api/cars/id 
        public async Task<IActionResult> EditCar(Guid id, Car car)
        {
            car.Id = id;
            var result = await Mediator.Send(new Edit.Command { Car = car });
            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }

        [HttpDelete("{id}")] // /api/cars/id
        public async Task<IActionResult> DeleteCar(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });
            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }
    }
}
