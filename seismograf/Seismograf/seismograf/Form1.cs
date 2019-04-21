using System;
using System.Collections.Generic;
using System.Windows.Forms;
using LiveCharts;
using LiveCharts.Defaults;
using LiveCharts.Wpf;
using seismograf.Models;
using SuperSocket.SocketBase.Config;
using SuperSocket.WebSocket;
using SuperSocket.WebSocket.Protocol;
using CloseReason = SuperSocket.SocketBase.CloseReason;

namespace seismograf
{
    public partial class Form1 : Form
    {
	    private static WebSocketServer wsServer;
	    delegate void UpdateNotificationsLabelCb(string text);
        delegate void UpdateChartCb(WsMessage chartInfo);
        ChartValues<ObservablePoint> chartValuesZ= new ChartValues<ObservablePoint>();
        ChartValues<ObservablePoint> chartValuesY = new ChartValues<ObservablePoint>();
        ChartValues<ObservablePoint> chartValuesX = new ChartValues<ObservablePoint>();

        public Form1()
        {
            InitializeComponent();
            angularGauge1.FromValue = -50;
            angularGauge1.ToValue = 50;
            angularGauge1.AnimationsSpeed = new TimeSpan(1);
            angularGauge2.FromValue = -50;
            angularGauge2.ToValue = 50;
            angularGauge2.AnimationsSpeed = new TimeSpan(1);
            angularGauge3.FromValue = -50;
            angularGauge3.ToValue = 50;
            angularGauge3.AnimationsSpeed = new TimeSpan(1);

            wsServer = new WebSocketServer();

	        var config = new ServerConfig
	        {
		        Name = "SeimsoWsComm",
		        Ip = "192.168.1.6",
		        Port = 80,
				LogAllSocketException = true,
				MaxRequestLength = 1000000
	        };

			wsServer.Setup(config);

	        wsServer.NewSessionConnected += OnNewSessionConnected;
	        wsServer.NewMessageReceived += OnMessageReceived;
	        wsServer.NewDataReceived += OnNewDataReceived;
			wsServer.SessionClosed += OnSessionClosed;

	        wsServer.Start();
	        this.UpdateNotificationsLabel("Server started");
		}



	    private void button1_Click(object sender, EventArgs e)
	    {

	    }

		private void timer1_Tick(object sender, EventArgs e)
		{
            timer1.Stop();
		}

		private void OnSessionClosed(WebSocketSession session, CloseReason value)
	    {
		    this.UpdateNotificationsLabel("Client disconnected");
		}

		private void OnNewDataReceived(WebSocketSession session, byte[] value)
	    {
		    this.UpdateNotificationsLabel("Data received");
		}

        private void SetCartesianChart(WsMessage chartInfo)
        {
            //   timer1.Interval = (int)speed;
            cartesianChart1.DisableAnimations = true;


            {
                if (chartInfo.data.axis == "x")
                {
                    chartValuesX = new ChartValues<ObservablePoint>();
                    foreach (ObservablePoint p in chartInfo.data.data)
                    {
                        chartValuesX.Add(p);
                        angularGauge1.Value = p.Y;
                    }
                }
                else if (chartInfo.data.axis == "y")
                {
                    chartValuesY = new ChartValues<ObservablePoint>();
                    foreach (ObservablePoint p in chartInfo.data.data)
                    {
                        chartValuesY.Add(p);
                        angularGauge2.Value = p.Y;

                    }
                }
                else
                {
                    chartValuesZ = new ChartValues<ObservablePoint>();
                    foreach (ObservablePoint p in chartInfo.data.data)
                    {
                        chartValuesZ.Add(p);
                        angularGauge3.Value = p.Y;

                    }
                }
            }

            //if (timer1.Enabled)
             //   timer1.Start();
            cartesianChart1.Series = new SeriesCollection
                    {
                        new LineSeries
                        {
                            Values = chartValuesX,
                            PointGeometrySize =10
                        },
                        new LineSeries
                        {
                            Values = chartValuesY,
                            PointGeometrySize =10
                        },
                        new LineSeries
                        {
                            Values = chartValuesZ,
                            PointGeometrySize =10
                        }
                    };
        }

		private void OnMessageReceived(WebSocketSession session, string value)
	    {
		    WsMessage message = Newtonsoft.Json.JsonConvert.DeserializeObject<WsMessage>(value);

            // TO DO CRACIUN: live updating charts
            if (message.type != "Alert")
            {
                if (cartesianChart1.InvokeRequired)
                {
                    UpdateChartCb d = new UpdateChartCb(SetCartesianChart);
                    this.Invoke(d, new object[] { message });
                }
                else
                {
                    SetCartesianChart(message);
                }
            }
            else
            {
                MessageBox.Show( "Don't panic!!!", "Earthquake", MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
            }

            

            // TO DO: HANDLE ALERTS
            // if(message.type == Alert)
        }

		private void OnNewSessionConnected(WebSocketSession session)
	    {
		    this.UpdateNotificationsLabel("Client connected");
	    }

	    private void UpdateNotificationsLabel(string text)
	    {
		    // InvokeRequired required compares the thread ID of the
		    // calling thread to the thread ID of the creating thread.
		    // If these threads are different, it returns true.
		    if (this.label4.InvokeRequired)
		    {
			    UpdateNotificationsLabelCb d = new UpdateNotificationsLabelCb(UpdateNotificationsLabel);
			    this.Invoke(d, new object[] { text });
		    }
		    else
		    {
			    this.label4.Text = text;
		    }
		}

	}
}
