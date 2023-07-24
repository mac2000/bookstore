
using Microsoft.EntityFrameworkCore;

var genres = new []{
    "Fantasy",
    "Adventure",
    "Romance",
    "Contemporary",
    "Dystopian",
    "Mystery",
    "Horror",
    "Thriller",
    "Paranormal",
    "Historical fiction",
    "Science Fiction"
};

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<BooksDbContext>(options => options.UseNpgsql(Environment.GetEnvironmentVariable("CONNECTION_STRING") ?? "Host=localhost;Port=5432;Database=books;Username=books;Password=books"));
builder.Services.AddCors();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<BooksDbContext>();
    await db.Database.EnsureCreatedAsync();
    if (!db.Books.Any()) {
        for(var i = 1; i <= 10; i++) {
            db.Books.Add(new Book {
                Id = i,
                Title = $"Book {i}",
                Pages = i * 100,
                Ganres = Enumerable.Range(1, new Random().Next(1, 3)).Select(_ => genres[new Random().Next(0, genres.Length)]).ToArray()
            });
        }
        await db.SaveChangesAsync();
    }
}

app.UseCors(b => b.WithOrigins("http://localhost:4200", "http://localhost:4000", "http://frontend:4200", "http://frontend:4000").AllowAnyMethod().AllowAnyHeader());

app.MapGet("/", () => "Books Service");

app.MapGet("/v1/books", async (BooksDbContext db) => await db.Books.ToListAsync());
app.MapGet("/v1/books/{id}", async (BooksDbContext db, int id) => await db.Books.FirstOrDefaultAsync(b => b.Id == id));
app.MapPost("/v1/books", async (BooksDbContext db, Book book) =>
{
    db.Books.Add(book);
    await db.SaveChangesAsync();
    return Results.Created($"/v1/books/{book.Id}", book);
});

app.Run();

public record Book
{
    public int Id { get; init; }
    public string Title { get; init; } = default!;
    public int Pages { get; init; }
    public string[] Ganres { get; init; } = default!;
}

public class BooksDbContext : DbContext
{
    public BooksDbContext(DbContextOptions<BooksDbContext> options) : base(options) {}

    public DbSet<Book> Books { get; set; } = default!;
}