using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Timers;
using Microsoft.AspNetCore.SignalR;
using suite.web.Hubs;

namespace suite.web.Services
{
    public class EchoTimer
    {
        private readonly IHubContext<TestHub> _testHub;
        private Timer _mockedEventTimer;

        public EchoTimer(IHubContext<TestHub> hub)
        {
            _testHub = hub;
            _mockedEventTimer = new Timer(4000);
            _mockedEventTimer.AutoReset = true;
            _mockedEventTimer.Elapsed += TimerExpire;
            _mockedEventTimer.Start();
            Console.WriteLine("Hello World");
        }

        public void TimerExpire(object o, ElapsedEventArgs e)
        {
            _testHub.Clients.All.SendAsync(nameof(IHubEvents.MessageHelloWorld), "Hello World");
            _testHub.Clients.All.SendAsync(nameof(IHubEvents.MessageNumberArray),
                new SignalNumberResponse() {Numbers = new[] {1, 2, 3, 4, 5}});
        }
    }
}
