using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class UserParentHierarchy
    {
        public int Id { get; set; }
        public int CreatedBy { get; set; }
        public string UserName { get; set; }
        public int Depth { get; set; }
        public int CorrectDepth { get; set; }
    }
}
