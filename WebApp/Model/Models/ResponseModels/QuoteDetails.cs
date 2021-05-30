using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.ResponseModels
{
    public class QuoteDetails
    {
        public string GROSS_PREMIUM { get; set; }
        public string PREMIUM_WITHOUT_COVERS { get; set; }
        public decimal IDV { get; set; }
        public string QUOTE_ID { get; set; }
        public string PACKAGE_PREMIUM { get; set; }
        public string PREMIUM { get; set; }
        public string SERVICETAX { get; set; }
        public string ECESS { get; set; }
        public string KRISHI_CESS { get; set; }
        public string POLICY_START_DATE { get; set; }
        public string POLICY_EXPIRY_DATE { get; set; }
        public string VERSION_NO { get; set; }
        public int POLICY_TERM { get; set; }
        public string TAX_TYPE { get; set; }
        public string IGST { get; set; }
        public string CGST { get; set; }
        public string SGST { get; set; }
        public string UTGST { get; set; }
        public string IDV_FOR_1ST_YEAR { get; set; }
        public string TECHNICAL_DISCOUNT { get; set; }
        public string LIABILITY_POLICY_TERM { get; set; }
        public string MINIMUM_IDV { get; set; }
        public string MAXIMUM_IDV { get; set; }
        public string CAMPAIGN_DISCOUNT { get; set; }
        public string OD_START_DATE { get; set; }
        public string OD_EXPIRY_DATE { get; set; }
        public string KERALA_FLOOD_CESS { get; set; }
        public ODPremiumDetails OD_PREMIUM { get; set; }
        public LiabilityDetails LIABILITY { get; set; }


    }
}
