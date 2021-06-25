using System;
using System.Globalization;
using System.Threading;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace suite.web.Hubs
{
    public class TestHub : Hub<IHubEvents>
    {
    }

    public interface IHubEvents
    {
        Task MessageHelloWorld(string message);
        Task MessageNumberArray(string withNumbers);
    }

    public class SignalNumberResponse
    {
        public int[] Numbers { get; set; }
    }
}
