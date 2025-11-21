using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using WebApplication1.Repository;

namespace WebApplication1.Controllers
{
    public class ProductController : Controller
    {
        private readonly Repositories<Product> _repo;

        public ProductController()
        {
            var context = new AppDbcontext();
            this._repo = new Repositories<Product>(context);
        }
        // GET: Product
        [HttpGet]
        public ContentResult GetAll()
        {
            try
            {
                var products = _repo.GetAll();
                var json = JsonConvert.SerializeObject(products, new JsonSerializerSettings
                {
                    DateFormatString = "yyyy-MM-dd"
                });
                Response.StatusCode = 200;
                return Content(json, "application/json");
            }catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Content(ex.ToString(), "text-plain");
            }

        }
        [HttpGet]
        public ContentResult Get(int id)
        {
            var entity = _repo.Read(id);
            if (entity == null)
            {
                Response.StatusCode = 404;
                return Content("Not found", "text/plain");
            }
            else
            {
                var json = JsonConvert.SerializeObject(entity, new JsonSerializerSettings
                {
                    DateFormatString = "yyyy-MM-dd"
                });
                Response.StatusCode = 200;
                return Content(json, "application/json");
            }
        }
        [HttpPost]
        public JsonResult Create(Product entity)
        {
            var product = _repo.Read(entity.Id);

            if (!ModelState.IsValid || product != null || entity.Price <= 0 || entity.Stock < 0)
            {
                Response.StatusCode = 500;
                return Json(new { success = false, message = "Datos inválidso" });
            }
            var validateName = _repo.GetAll();
            foreach (var item in validateName)
            {
                if (item.Name == entity.Name)
                {
                    Response.StatusCode = 500;
                    return Json(new { success = false, message = "Nombre inválido" });
                }
            }

            Response.StatusCode = 200;
            _repo.Create(entity);
            return Json(new { success = true, message = "Entidad creada correctamente" });

        }
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var product = _repo.Read(id);
            if (product == null)
            {
                Response.StatusCode = 404;
                return Json(new { success = false, message = "El producto que intenta eliminar no existe" });
            }
            else
            {
                _repo.Delete(id);
                Response.StatusCode = 200;
                return Json(new { success = true, message = "Producto eliminado" });
            }
        }

        [HttpPut]
        public JsonResult Update(Product entity)
        {
            var product = _repo.Read(entity.Id);
            if (product == null)
            {
                Response.StatusCode = 404;
                return Json(new { success = false, message = "El producto que intenta actualizar no existe" });
            }
            else
            {
                _repo.Update(entity);
                Response.StatusCode = 200;
                return Json(new { success = true, message = "Producto actualizado" });
            }
        }
    }
}