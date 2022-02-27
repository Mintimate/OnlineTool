package cn.mintimate.tool;

import javax.websocket.Endpoint;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Enumeration;
import java.util.HashMap;

public class Test
{
    public static void main(String[] args)
    {
        try
        {
            System.out.println("getLocalHost: " + InetAddress.getLocalHost().toString());

            System.out.println("All addresses for local host:");
            InetAddress[] addr = InetAddress.getAllByName(InetAddress.getLocalHost().getHostName());
            for(InetAddress a : addr)
            {
                System.out.println(a.toString());
            }
        }
        catch(UnknownHostException _e)
        {
            _e.printStackTrace();
        }

        try
        {
            Enumeration nicEnum = NetworkInterface.getNetworkInterfaces();
            while(nicEnum.hasMoreElements())
            {
                NetworkInterface ni=(NetworkInterface) nicEnum.nextElement();
                System.out.println("Name: " + ni.getDisplayName());
                System.out.println("Name: " + ni.getName());
                Enumeration addrEnum = ni.getInetAddresses();
                while(addrEnum.hasMoreElements())
                {
                    InetAddress ia= (InetAddress) addrEnum.nextElement();
                    System.out.println("===========");
                    System.out.println("IP地址是："+ia.getHostAddress());
                }
            }
        }
        catch(SocketException _e)
        {
            _e.printStackTrace();
        }
    }
}