---
title: "Fixing your APIs infinite loop"
date: "2021-09-16"
---
If you are new to backend development, you will most likely encounter something like this:

```shell
System.Text.Json.JsonException: 
A possible object cycle was detected which is not supported. This can either be due to a cycle or if the object depth is larger than the maximum allowed depth of 32.
```

I'm using C#, ASP.NET and Entity framework to illustrate the issue in this article, but it doesn't really matter what language or framework you are using, these concepts will still apply. If you see something like this, you are most likely creating an infinite loop and need to implement a DTO.

 For example, lets say we are working on some type of forum where you can create a thread, and each thread has a bunch of associated posts.

```csharp
public class PostModel
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime UpdatedOn { get; set; }
    public ThreadModel Thread { get; set; }
}
```

The threads are associated to posts with the Replies property.

```csharp
public class ThreadModel
{
    public Guid Id { get; init; }
    public string Title { get; init; }
    public string Text { get; init; }
    public DateTime CreatedOn { get; init; }
    public DateTime UpdatedOn { get; init; }
    public List<PostModel> Replies { get; set; }
}
```

When you send a raw ThreadModel through your controller, you will also send all of the associated posts. The posts have a Thread property which contains the related thread, leading to an infinite loop.

## Data Transfer Objects

You will resolve this by using a DTO, or data transfer object, which is a class that you can serialize your ThreadModel and PostModel classes to before returning them from your controller.

So if you want your API response to contain a post, but you also want to include the post's related thread, you might create a new class that has a relationship to a DTO instead of a thread.

```csharp
public class PostSimpleThreadDto
{
    public Guid Id { get; init; }
    public string Text { get; init; }
    public DateTime CreatedOn { get; init; }
    public DateTime UpdatedOn { get; init; }
    public ThreadNoReplyDto Thread { get; set; }
}
```

This new PostSimpleThreadDto class still has a Thread property, but the type is a new ThreadNoReplyDto instead of a regular old Thread.

```csharp
public class ThreadNoReplyDto
{
    public Guid Id { get; init; }
    public string Title { get; init; }
    public string Text { get; init; }
}
```

The ThreadNoReplyDto class contains information about a class itself, but no list of related PostModel objects, thus preventing an infinite loop.

From here, you can implement a variety of DTO objects to safely transport your data structures, and refactor your API controllers to work with DTO classes only. Your controller should have no knowledge of the underlying logic that is required to form the API response, and your lower service layer should have no knowledge of your DTO.

```csharp
[HttpGet]
public ActionResult<PostSimpleThreadDto> Get()
{
    List<PostModel> posts = Service.GetAllPosts();
    IEnumerable<PostSimpleThreadDto> dto = posts.Select(c => c.AsSimpleThreadDto());
    return Ok(dto);
}
```