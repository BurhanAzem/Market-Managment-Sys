using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TTS.Source.Application.Common.Behaviors;
using FluentValidation;
using Mapster;

namespace TTS.Source.Application.ServiceConfiguration
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            AddMapsterConfiguration(services);

            return services;
        }


        private static void AddMapsterConfiguration(IServiceCollection services)
        {
            TypeAdapterConfig.GlobalSettings.Default.MapToConstructor(true);
        }

    }
}
