namespace GlowFlow.Application.Exceptions;

public class BaseException : Exception
{
    public int StatusCode { get; set; }

    public BaseException(string message, int statusCode = 500) : base(message)
    {
        StatusCode = statusCode;
    }
}