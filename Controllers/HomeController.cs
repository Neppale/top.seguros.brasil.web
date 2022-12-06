using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TopSegurosBrasilWeb.Models;

namespace TopSegurosBrasilWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Cadastro()
        {
            return View();
        }
        public IActionResult CadastroII()
        {
            return View();
        }

        public IActionResult CadastroIII()
        {
            return View();
        }

        public IActionResult CadastroIV()
        {
            return View();
        }

        public IActionResult CadastroV()
        {
            return View();
        }

        public IActionResult CadastroVI()
        {
            return View();
        }
        public IActionResult CadastroVII()
        {
            return View();
        }
        public IActionResult CadastroCobertura()
        {
            return View();
        }

        public IActionResult AcionarSeguroI()
        {
            return View();
        }

        public IActionResult AcionarSeguroII()
        {
            return View();
        }

        public IActionResult AcionarSeguroIII()
        {
            return View();
        }

        public IActionResult AcionarSeguroIV()
        {
            return View();
        }

        public IActionResult AcionarSeguroV()
        {
            return View();
        }
        
        public IActionResult UserPage()
        {
            return View();
        }

        public IActionResult AcionarSeguroVI()
        {
            return View();
        }

        public IActionResult DetalhesCobertura()
        {
            return View();
        }

        

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }

      

}