using Model.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Text;

namespace Common.Helper
{
    public static class Converter
    {
        public static DataTable ToDataTable<T>(this List<T> iList)
        {
            DataTable dataTable = new DataTable();
            PropertyDescriptorCollection propertyDescriptorCollection =
                TypeDescriptor.GetProperties(typeof(T));
            for (int i = 0; i < propertyDescriptorCollection.Count; i++)
            {
                PropertyDescriptor propertyDescriptor = propertyDescriptorCollection[i];
                Type type = propertyDescriptor.PropertyType;

                if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
                    type = Nullable.GetUnderlyingType(type);


                dataTable.Columns.Add(propertyDescriptor.Name, type);
            }
            object[] values = new object[propertyDescriptorCollection.Count];
            foreach (T iListItem in iList)
            {
                for (int i = 0; i < values.Length; i++)
                {
                    values[i] = propertyDescriptorCollection[i].GetValue(iListItem);
                }
                dataTable.Rows.Add(values);
            }
            return dataTable;
        }

        public static DataTable CreateDataTable(IEnumerable<int> ids)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            foreach (int id in ids)
            {
                table.Rows.Add(id);
            }
            return table;
        }

        public static DataTable CreateDataTable(IEnumerable<string> names)
        {
            DataTable table = new DataTable();  
            table.Columns.Add("Name", typeof(string));
            foreach (string name in names)
            {
                table.Rows.Add(name);
            }
            return table;
        }

        public static DataTable CreateDataTable(IEnumerable<BulkVehicleUpload> vehicles)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("VehicleType", typeof(string));
            table.Columns.Add("Make", typeof(string));
            table.Columns.Add("Model", typeof(string));
            table.Columns.Add("Variant", typeof(string));
            table.Columns.Add("Message", typeof(string));
            table.Columns.Add("Result", typeof(int));
            foreach (BulkVehicleUpload v in vehicles)
            {
                table.Rows.Add(v.Id, v.VehicleType,v.Make, v.Model, v.Variant, v.Message, v.Result);
            }
            return table;
        }

        public static DataTable CreateDataTable(IEnumerable<BulkMasterDataUpload> vehicles)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("Name", typeof(string));
            table.Columns.Add("Message", typeof(string));
            table.Columns.Add("Result", typeof(int));
            foreach (BulkMasterDataUpload v in vehicles)
            {
                table.Rows.Add(v.Id, v.Name, v.Message, v.Result);
            }
            return table;
        }
    }
}
