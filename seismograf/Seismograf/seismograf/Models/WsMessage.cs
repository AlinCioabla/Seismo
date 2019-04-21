using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace seismograf.Models
{
	class WsMessage
	{
		[JsonProperty(PropertyName = "type")]
		public string type { get; set; }
		[JsonProperty(PropertyName = "data")]
		public ChartData data { get; set; }
	}
}
