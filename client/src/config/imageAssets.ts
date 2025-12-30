// client/src/config/imageAssets.ts
// 정적 에셋 관리

/**
 * 에셋 베이스 URL 상수
 */
const ASSETS_BASE_URL = 'https://raw.githubusercontent.com/JaceDashS/myAssets/main';

export const ImageAssets = {
  // Profile & University
  profile: `${ASSETS_BASE_URL}/img/profile.jpg`,
  sbuLogo: `${ASSETS_BASE_URL}/img/output-onlinepngtools.png`,

  // Profile Overview (Description JSON)
  profileOverview: `${ASSETS_BASE_URL}/json/profile-overview.json`,

  // AWS Certificates
  awsCertificateBadge: `${ASSETS_BASE_URL}/img/AWS-Certified-Cloud-Practitioner.png`,
  awsCertificate: `${ASSETS_BASE_URL}/img/AWS-Certified-Cloud-Practitioner-certificate.png`,
  awsCertificatePdf: `${ASSETS_BASE_URL}/pdf/AWS-Certified-Cloud-Practitioner-certificate.pdf`,

  // JLPT Certificates
  jlptLogo: `${ASSETS_BASE_URL}/img/Japanese-Language_Proficiency_Test_logo.png`,
  jlptCertificate1: `${ASSETS_BASE_URL}/img/jlpt_1.jpg`,
  jlptCertificate2: `${ASSETS_BASE_URL}/img/jlpt_2.jpg`,
} as const;

export default ImageAssets;

