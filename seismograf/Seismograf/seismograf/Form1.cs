using System;
using System.Collections.Generic;
using System.Windows.Forms;
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

		public Form1()
        {
            InitializeComponent();
			wsServer = new WebSocketServer();

	        var config = new ServerConfig
	        {
		        Name = "SeimsoWsComm",
		        Ip = "192.168.0.104",
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

		}

		private void OnSessionClosed(WebSocketSession session, CloseReason value)
	    {
		    this.UpdateNotificationsLabel("Client disconnected");
		}

		private void OnNewDataReceived(WebSocketSession session, byte[] value)
	    {
		    this.UpdateNotificationsLabel("Data received");
		}

		private void OnMessageReceived(WebSocketSession session, string value)
	    {
		    WsMessage message = Newtonsoft.Json.JsonConvert.DeserializeObject<WsMessage>(value);

			// TO DO CRACIUN: live updating charts
			//if (message.data.axis == "x")
			//{
			// for (int i = 0; i < jsObj.forJson.data.Length; i++)
			//  angularGaugeX.Value = (double)(jsObj.forJson.data[i][1]);
			//}

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
