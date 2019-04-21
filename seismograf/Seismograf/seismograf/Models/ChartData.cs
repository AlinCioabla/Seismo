using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace seismograf.Models
{
	class ChartData
	{
		[JsonProperty(PropertyName = "data")]
		public Point[] data { get; set; }
		[JsonProperty(PropertyName = "timeIntervalMs")]
		public decimal timeIntervalMs { get; set; }
		[JsonProperty(PropertyName = "updateFrequencyMs")]
		public decimal updateFrequencyMs { get; set; }
		[JsonProperty(PropertyName = "axis")]
		public string axis { get; set; }
	}
}
