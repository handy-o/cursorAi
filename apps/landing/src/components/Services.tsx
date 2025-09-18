'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  Target, 
  Brain,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: BookOpen,
      title: '개별 맞춤형 학습',
      description: '학생별 수준과 학습 스타일에 맞는 개별화된 수학 프로그램을 제공합니다.',
      features: ['개인별 진단 테스트', '맞춤형 학습 계획', '단계별 실력 향상', '정기 성취도 평가'],
      color: 'blue',
      stats: '개인별 맞춤'
    },
    {
      icon: Users,
      title: '소그룹 수업',
      description: '소규모 그룹으로 효과적인 상호작용과 집중도를 높인 수업을 진행합니다.',
      features: ['최대 6명 소그룹', '활발한 질문과 답변', '동료 학습 효과', '경쟁과 협력의 균형'],
      color: 'green',
      stats: '최대 6명'
    },
    {
      icon: Target,
      title: '목표 지향 학습',
      description: '명확한 목표 설정과 체계적인 학습 계획으로 성취감을 높입니다.',
      features: ['단기/장기 목표 설정', '체계적 학습 로드맵', '정기 목표 점검', '성취도 시각화'],
      color: 'purple',
      stats: '목표 달성률 95%'
    },
    {
      icon: Brain,
      title: '사고력 개발',
      description: '단순 암기가 아닌 논리적 사고력과 문제 해결 능력을 기릅니다.',
      features: ['논리적 사고 훈련', '창의적 문제 해결', '수학적 사고력 향상', '비판적 사고 개발'],
      color: 'orange',
      stats: '사고력 향상'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'bg-blue-100 text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'bg-green-100 text-green-600',
        button: 'bg-green-600 hover:bg-green-700',
        border: 'border-green-200'
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'bg-purple-100 text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700',
        border: 'border-purple-200'
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'bg-orange-100 text-orange-600',
        button: 'bg-orange-600 hover:bg-orange-700',
        border: 'border-orange-200'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            우리의 교육 프로그램
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            체계적이고 과학적인 방법으로 수학 실력을 향상시키는 
            <span className="text-blue-600 font-semibold"> 4가지 핵심 프로그램</span>을 제공합니다
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            return (
              <Card 
                key={index} 
                className={`${colors.bg} ${colors.border} border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-2`}
              >
                <CardContent className="p-6">
                  {/* Icon and Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colors.icon}`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-600">{service.stats}</div>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full ${colors.button} text-white`}
                    size="sm"
                  >
                    자세히 보기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              지금 시작하세요!
            </h3>
            <p className="text-lg lg:text-xl mb-8 opacity-90">
              무료 상담을 통해 맞춤형 학습 계획을 세워보세요
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Star className="w-5 h-5 mr-2" />
                무료 상담 신청
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              >
                프로그램 문의
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-80">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  무료 체험 수업
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  개별 맞춤 상담
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  성적 향상 보장
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


