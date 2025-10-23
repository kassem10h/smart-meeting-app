using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Smart_Meeting.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDBContext>
    {
        public AppDBContext CreateDbContext(string[] args)
        {
            // Build a configuration object to read from appsettings.json
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            // Create an options builder for the DbContext
            var builder = new DbContextOptionsBuilder<AppDBContext>();

            // Get the connection string from the configuration
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            // Configure the DbContext to use SQL Server with the connection string
            builder.UseSqlServer(connectionString);

            // Create and return a new instance of the DbContext
            return new AppDBContext(builder.Options);
        }
    }
}