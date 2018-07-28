// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using CircleMedia.Helpers;
using CircleMedia.Resources;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CircleMedia.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;


        public CustomerController(IUnitOfWork unitOfWork, ILogger<CustomerController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }



        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            // var allCustomers = _unitOfWork.Customers.GetAllCustomersData();
            // return Ok(Mapper.Map<IEnumerable<CustomerViewModel>>(allCustomers));
            return Ok();
        }



        [HttpGet("throw")]
        public IEnumerable<CustomerViewModel> Throw()
        {
            throw new InvalidOperationException("This is a test exception: " + DateTime.Now);
        }



        [HttpGet("email")]
        public async Task<string> Email()
        {
            string recepientName = "QickApp Tester"; //         <===== Put the recepient's name here
            string recepientEmail = "martvee97@gmail.com"; //   <===== Put the recepient's email here

            string message = EmailTemplates.GetTestEmail(recepientName, DateTime.UtcNow);

            (bool success, string errorMsg) response = await _emailer.SendEmailAsync(recepientName, recepientEmail, "Test Email from CircleMedia", message);

            if (response.success)
                return "Success";

            return "Error: " + response.errorMsg;
        }

        [HttpGet("sendemail")]
        public string Send()
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("kingswayct@gmail.com");
                mail.To.Add("martvee97@gmail.com");
                mail.Subject = "Test Mail";
                mail.Body = EmailTemplates.GetTestEmail("martvee97@gmail.com", DateTime.UtcNow);
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("kingswayct@gmail.com", "p@r@d1s3");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);

                return "Sent!";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value: " + id;
        }



        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }



        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }



        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
