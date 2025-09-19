'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Palette, Zap, Shield, Smartphone, Globe } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Modern Development',
    description: 'Build with the latest technologies and best practices for optimal performance and maintainability.'
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Create stunning user interfaces with our carefully crafted design system and components.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with advanced caching, code splitting, and performance monitoring.'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with automated testing, monitoring, and backup systems.'
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Responsive design that works perfectly on all devices and screen sizes.'
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Deploy anywhere with CDN support, edge computing, and global infrastructure.'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and services you need to build, deploy, and scale your applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}