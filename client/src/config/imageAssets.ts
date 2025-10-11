// client/src/config/imageAssets.ts
// GitHub Pages 이미지 에셋 관리

const GITHUB_ASSETS_BASE_URL = 'https://jacedashs.github.io/myAssets/img';

export const ImageAssets = {
  // Profile & University
  profile: `${GITHUB_ASSETS_BASE_URL}/profile.jpg`,
  sbuLogo: `${GITHUB_ASSETS_BASE_URL}/output-onlinepngtools.png`,

  // AWS Certificates
  awsCertificateBadge: `${GITHUB_ASSETS_BASE_URL}/AWS-Certified-Cloud-Practitioner.png`,
  awsCertificate: `${GITHUB_ASSETS_BASE_URL}/AWS-Certified-Cloud-Practitioner-certificate.png`,

  // JLPT Certificates
  jlptLogo: `${GITHUB_ASSETS_BASE_URL}/Japanese-Language_Proficiency_Test_logo.png`,
  jlptCertificate1: `${GITHUB_ASSETS_BASE_URL}/jlpt_1.jpg`,
  jlptCertificate2: `${GITHUB_ASSETS_BASE_URL}/jlpt_2.jpg`,

  // App Images
  squatBalancer: `${GITHUB_ASSETS_BASE_URL}/Squat-Balancer.png`,
  transformerAttentionVisualizer: `${GITHUB_ASSETS_BASE_URL}/Transformer-Attention-Visualizer.png`,
} as const;

export default ImageAssets;

