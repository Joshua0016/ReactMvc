using Microsoft.Ajax.Utilities;
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
        private readonly Repositories<Warehouse> _repoWarehouses;
        private readonly AppDbcontext context;

        public ProductController()
        {
            this.context = new AppDbcontext();
            this._repo = new Repositories<Product>(context);
            this._repoWarehouses = new Repositories<Warehouse>(context);
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
            } catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Content(ex.ToString() + "Error...", "text-plain");
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
        [HttpGet]
        public ContentResult IsActive(bool IsActive)
        {
            var products = _repo.GetAll();
            var active = products.Where(p => p.IsActive == IsActive).ToList();
            var json = JsonConvert.SerializeObject(active, new JsonSerializerSettings
            {
                DateFormatString = "yyyy-MM-dd"
            });

            return Content(json, "application/json");


        }
        [HttpPost]
        public JsonResult Create(Product entity)
        {

            var warehouses = _repoWarehouses.GetAll();

            if (!ModelState.IsValid || entity.Price <= 0 || entity.Stock < 0 || !warehouses.Any((x) => x.Id == entity.WarehousesId))
            {
                Response.StatusCode = 500;
                return Json(new { success = false, message = "Datos inválidos" });
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

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var warehouses = _repoWarehouses.GetAll();
            var product = _repo.Read(id);
            if (product == null)
            {
                Response.StatusCode = 404;
                return Json(new { success = false, message = "El producto que intenta eliminar no existe" });
            }
            else if(warehouses.Any((w) => w.Id == product.WarehousesId))
            {
                Response.StatusCode = 500;
                return Json(new { message = "No puedes eliminar un registro con alguna dependencia" });
            }
            else
            {
                _repo.Delete(id);
                Response.StatusCode = 204;
                return Json(new {message = "Registro eliminado con éxito"});
            }
        }

        [HttpPost]
        public JsonResult Update(Product entity)
        {   
            var product = _repo.Read(entity.Id);
            var warehouses = _repoWarehouses.GetAll();
            if (product == null || !ModelState.IsValid || !warehouses.Any((x) => x.Id == entity.WarehousesId))
            {
                Response.StatusCode = 404;
                return Json(new { success = false, message = "El producto que intenta actualizar no existe o contiene datos inválidos" });
            }
            else
            {
                //el valor actual en el contexto se actualiza con los nuevos datos
                context.Entry(product).CurrentValues.SetValues(entity);
                _repo.Update(entity);
                Response.StatusCode = 200;
                return Json(new { success = true, message = "Producto actualizado" });
            }
        }
    }
}