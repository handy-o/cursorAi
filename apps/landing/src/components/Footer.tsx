'use client';

import { Button } from '@/components/ui/button';
import { Calculator, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    programs: [
      { name: '개별 맞춤형 학습', href: '#services' },
      { name: '소그룹 수업', href: '#services' },
      { name: '목표 지향 학습', href: '#services' },
      { name: '사고력 개발', href: '#services' }
    ],
    academy: [
      { name: '학원 소개', href: '#about' },
      { name: '선생님 소개', href: '#teachers' },
      { name: '학습 환경', href: '#facilities' },
      { name: '성공 사례', href: '#success' }
    ],
    support: [
      { name: '자주 묻는 질문', href: '#faq' },
      { name: '학습 자료실', href: '#materials' },
      { name: '공지사항', href: '#notice' },
      { name: '문의하기', href: '#contact' }
    ],
    legal: [
      { name: '이용약관', href: '#terms' },
      { name: '개인정보처리방침', href: '#privacy' },
      { name: '환불정책', href: '#refund' },
      { name: '사이트맵', href: '#sitemap' }
    ]
  };

  const contactInfo = [
    {
      icon: Phone,
      label: '전화번호',
      value: '02-1234-5678',
      href: 'tel:02-1234-5678'
    },
    {
      icon: Mail,
      label: '이메일',
      value: 'info@mathmaster.co.kr',
      href: 'mailto:info@mathmaster.co.kr'
    },
    {
      icon: MapPin,
      label: '주소',
      value: '서울시 강남구 테헤란로 123',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">수학마스터</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              개별 맞춤형 수학 교육으로 모든 학생의 잠재력을 끌어올리는 
              전문 수학학원입니다. 체계적이고 과학적인 방법으로 
              수학 실력을 향상시킵니다.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <contact.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400">{contact.label}</div>
                    <a 
                      href={contact.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {contact.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">프로그램</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h3 className="text-lg font-semibold mb-4">학원정보</h3>
            <ul className="space-y-2">
              {footerLinks.academy.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">고객지원</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-4">약관 및 정책</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <h3 className="text-xl font-bold mb-2">무료 상담 신청</h3>
                <p className="text-blue-100">
                  개별 맞춤형 학습 계획을 무료로 상담받아보세요
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                >
                  상담 신청하기
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  전화 상담
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} 수학마스터. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-xs">
              사업자등록번호: 123-45-67890 | 대표: 김수학 | 
              통신판매업신고번호: 제2024-서울강남-1234호
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


