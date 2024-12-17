using System.ComponentModel.DataAnnotations;

namespace Cars.API
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        // przynajmniej jedna mała litera, jedna dużo litera, jedna cyfra i długość pomiędzy 4-8 znaków
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}
