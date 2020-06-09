namespace Model.Models.Policy
{
    public class IdNamePair
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
   
    public class VehicleType : IdNamePair { }
    public class PolicyTypes : IdNamePair { }
    public class Makes : IdNamePair { }
    public class Models : IdNamePair { }
    public class Variants : IdNamePair { }
    public class FuelTypes : IdNamePair { }
    public class Insurers : IdNamePair { }
    public class PaymentModes : IdNamePair { }
    public class Brokers : IdNamePair { }
    public class PolicyStatus : IdNamePair { }
}
