using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cars.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // endpoint zawsze zaczyna się "api/..."
    // BaseApiController to klasa bazowa dla innych kontrolerów w aplikacji.
    // Wszystkie kontrolery, które będą dziedziczyć z tej klasy, automatycznie będą miały te same atrybuty. 
    public class BaseApiController : ControllerBase 
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>();
    }
}