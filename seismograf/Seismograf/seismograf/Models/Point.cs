using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace seismograf.Models
{
	class Point
	{
		[JsonProperty(PropertyName = "x")]
		public decimal x { get; set; }
		[JsonProperty(PropertyName = "y")]
		public decimal y { get; set; }
	}
}
