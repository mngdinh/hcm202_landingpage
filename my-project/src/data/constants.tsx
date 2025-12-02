import { Target, Users, Landmark, ShieldAlert } from 'lucide-react';
import type { ContentSection, QuizQuestion } from '../types';

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: 1,
    title: "Kiên định mục tiêu và con đường cách mạng",
    subtitle: "Nguyên tắc sống còn đối với chế độ và sự phát triển của Việt Nam.",
    points: [
      "Tính tất yếu: Tiến tới CNXH là phù hợp với khát vọng nhân dân và sự lựa chọn của Bác.",
      "Bài học cốt lõi: Nắm vững ngọn cờ độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
      "Nhiệm vụ: Giải quyết hài hòa mối quan hệ giữa đổi mới, ổn định và phát triển, giữa kinh tế thị trường và định hướng XHCN."
    ],
    highlight: "Độc lập dân tộc gắn liền với Chủ nghĩa xã hội",
    icon: Target
  },
  {
    id: 2,
    title: "Phát huy sức mạnh dân chủ xã hội chủ nghĩa",
    subtitle: "Bản chất chế độ: Của dân, do dân, vì dân.",
    points: [
      "Bảo đảm tất cả quyền lực nhà nước thuộc về nhân dân.",
      "Thực hiện nghiêm túc phương châm: Dân biết, dân bàn, dân làm, dân kiểm tra.",
      "Dân chủ phải đi đôi với kỷ cương, phép nước; gắn liền với hệ thống pháp luật."
    ],
    highlight: "Dân biết, dân bàn, dân làm, dân kiểm tra",
    icon: Users
  },
  {
    id: 3,
    title: "Kiện toàn hệ thống chính trị",
    subtitle: "Công cụ đắc lực để thực hiện quyền làm chủ của nhân dân.",
    points: [
      "Tính nhất nguyên: Đặt dưới sự lãnh đạo duy nhất của Đảng Cộng sản Việt Nam.",
      "Cấu trúc: Đảng lãnh đạo, Nhà nước quản lý, Mặt trận và các đoàn thể làm nòng cốt.",
      "Yêu cầu: Xây dựng hệ thống trong sạch, vững mạnh để bảo vệ Tổ quốc và thực thi dân chủ."
    ],
    highlight: "Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ",
    icon: Landmark
  },
  {
    id: 4,
    title: "Đấu tranh chống suy thoái",
    subtitle: "Nhiệm vụ then chốt trong công tác xây dựng Đảng hiện nay.",
    points: [
      "Nguy cơ: Sự suy thoái về tư tưởng, đạo đức có thể dẫn đến 'tự diễn biến', 'tự chuyển hóa'.",
      "Cảnh báo của Bác: Đây là những 'căn bệnh' nguy hiểm đe dọa sự tồn vong của chế độ.",
      "Giải pháp: Thực hiện Nghị quyết TW4, đẩy lùi tham nhũng, lãng phí, quan liêu."
    ],
    highlight: "Chống tự diễn biến, tự chuyển hóa",
    icon: ShieldAlert
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Bài học cốt lõi được rút ra từ thực tiễn cách mạng Việt Nam là gì?",
    options: [
      "Chỉ tập trung phát triển kinh tế thị trường.",
      "Nắm vững ngọn cờ độc lập dân tộc và chủ nghĩa xã hội.",
      "Hội nhập quốc tế bằng mọi giá.",
      "Ưu tiên ổn định chính trị hơn phát triển văn hóa."
    ],
    correctAnswer: 1,
    explanation: "Giáo trình khẳng định bài học hàng đầu là nắm vững ngọn cờ độc lập dân tộc gắn liền với chủ nghĩa xã hội."
  },
  {
    id: 2,
    question: "Phương châm thực hiện dân chủ xã hội chủ nghĩa là gì?",
    options: [
      "Dân biết, dân bàn, dân làm, dân kiểm tra.",
      "Dân nghe, dân tin, dân làm theo.",
      "Nhà nước quyết định, nhân dân chấp hành.",
      "Dân tự do tuyệt đối trong mọi hoạt động."
    ],
    correctAnswer: 0,
    explanation: "Cơ chế thực hiện dân chủ là 'Dân biết, dân bàn, dân làm, dân kiểm tra'."
  },
  {
    id: 3,
    question: "Đặc điểm nổi bật của hệ thống chính trị Việt Nam là gì?",
    options: [
      "Tam quyền phân lập.",
      "Đa nguyên, đa đảng.",
      "Tính nhất nguyên và thống nhất dưới sự lãnh đạo của Đảng.",
      "Phi chính trị hóa lực lượng vũ trang."
    ],
    correctAnswer: 2,
    explanation: "Hệ thống chính trị Việt Nam có tính nhất nguyên về chính trị, tổ chức, tư tưởng dưới sự lãnh đạo của Đảng."
  },
  {
    id: 4,
    question: "Nguy cơ nào được xem là bước ngắn dẫn đến 'tự diễn biến', 'tự chuyển hóa'?",
    options: [
      "Tụt hậu về kinh tế.",
      "Thiên tai và dịch bệnh.",
      "Suy thoái về tư tưởng chính trị, đạo đức, lối sống.",
      "Sự cạnh tranh gay gắt của thị trường quốc tế."
    ],
    correctAnswer: 2,
    explanation: "Sự suy thoái về tư tưởng chính trị, đạo đức, lối sống là nguyên nhân trực tiếp dẫn đến tự diễn biến, tự chuyển hóa."
  },
  {
    id: 5,
    question: "Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH được bổ sung, phát triển vào năm nào?",
    options: [
      "Năm 1986",
      "Năm 2001",
      "Năm 2011",
      "Năm 2021"
    ],
    correctAnswer: 2,
    explanation: "Cương lĩnh 1991 được bổ sung, phát triển năm 2011."
  },
  {
    id: 6,
    question: "Để kiên định mục tiêu cách mạng, cần giải quyết tốt mối quan hệ nào sau đây?",
    options: [
      "Giữa tăng trưởng kinh tế và bảo vệ môi trường.",
      "Giữa kinh tế thị trường và định hướng xã hội chủ nghĩa.",
      "Giữa truyền thống và hiện đại.",
      "Giữa đô thị và nông thôn."
    ],
    correctAnswer: 1,
    explanation: "Một trong các mối quan hệ lớn cần giải quyết là giữa kinh tế thị trường và định hướng xã hội chủ nghĩa."
  },
  {
    id: 7,
    question: "Bản chất của chế độ xã hội chủ nghĩa mà nhân dân ta xây dựng là gì?",
    options: [
      "Của dân, do dân, vì dân.",
      "Do giai cấp công nhân lãnh đạo tuyệt đối.",
      "Tập trung dân chủ.",
      "Tự do cạnh tranh."
    ],
    correctAnswer: 0,
    explanation: "Nội dung phát huy sức mạnh dân chủ nhấn mạnh bản chất chế độ là 'của dân, do dân, vì dân'."
  },
  {
    id: 8,
    question: "Trong thực thi dân chủ, cần phê phán và xử lý nghiêm biểu hiện nào?",
    options: [
      "Dân chủ trực tiếp.",
      "Dân chủ đại diện.",
      "Dân chủ cực đoan, dân chủ hình thức.",
      "Trưng cầu dân ý."
    ],
    correctAnswer: 2,
    explanation: "Cần phê phán và xử lý nghiêm những biểu hiện dân chủ cực đoan, dân chủ hình thức, hoặc lợi dụng dân chủ."
  },
  {
    id: 9,
    question: "Dân chủ xã hội chủ nghĩa không thể tách rời yếu tố nào?",
    options: [
      "Kinh tế tư nhân.",
      "Hệ thống pháp luật và kỷ cương phép nước.",
      "Sự hỗ trợ của quốc tế.",
      "Công nghệ thông tin."
    ],
    correctAnswer: 1,
    explanation: "Dân chủ không thể tách rời việc hoàn thiện hệ thống pháp luật; dân chủ phải đi đôi với kỷ cương, phép nước."
  },
  {
    id: 10,
    question: "Hệ thống chính trị bao gồm những thành phần nào?",
    options: [
      "Đảng, Nhà nước, Doanh nghiệp.",
      "Nhà nước, Quân đội, Công an.",
      "Đảng, Nhà nước, Mặt trận Tổ quốc và các đoàn thể chính trị - xã hội.",
      "Quốc hội, Chính phủ, Tòa án."
    ],
    correctAnswer: 2,
    explanation: "Cấu trúc hệ thống bao gồm Đảng, Nhà nước, Mặt trận Tổ quốc và các đoàn thể chính trị - xã hội."
  },
  {
    id: 11,
    question: "Mặt trận Tổ quốc và các đoàn thể có vai trò gì trong hệ thống chính trị?",
    options: [
      "Quản lý điều hành nền kinh tế.",
      "Ban hành pháp luật.",
      "Tạo nên sức mạnh tổng hợp, bảo đảm dân chủ thực tế.",
      "Xét xử các vụ án."
    ],
    correctAnswer: 2,
    explanation: "Các tổ chức này gắn bó mật thiết nhằm tạo nên sức mạnh tổng hợp... bảo đảm dân chủ được thực hiện trên thực tế."
  },
  {
    id: 12,
    question: "Điều kiện tiên quyết để nền dân chủ xã hội chủ nghĩa được thực thi là gì?",
    options: [
      "Thu nhập bình quân đầu người cao.",
      "Hiệu quả hoạt động của hệ thống chính trị.",
      "Có nhiều đảng phái chính trị.",
      "Hội nhập quốc tế sâu rộng."
    ],
    correctAnswer: 1,
    explanation: "Hiệu quả hoạt động của hệ thống chính trị là điều kiện tiên quyết để nền dân chủ XHCN được thực thi."
  },
  {
    id: 13,
    question: "Nghị quyết nào của Đảng tập trung vào nhiệm vụ xây dựng, chỉnh đốn Đảng?",
    options: [
      "Nghị quyết Đại hội VI.",
      "Nghị quyết Trung ương 4 khóa XII.",
      "Nghị quyết Trung ương 5 khóa VIII.",
      "Cương lĩnh 2011."
    ],
    correctAnswer: 1,
    explanation: "Cần thực hiện hiệu quả Nghị quyết Trung ương 4 khóa XII về tăng cường xây dựng, chỉnh đốn Đảng."
  },
  {
    id: 14,
    question: "Những 'căn bệnh' như tham nhũng, lãng phí, quan liêu đe dọa trực tiếp đến điều gì?",
    options: [
      "Tốc độ tăng trưởng GDP.",
      "Sự tồn vong của Đảng và chế độ.",
      "Quan hệ ngoại giao.",
      "Ngân sách nhà nước."
    ],
    correctAnswer: 1,
    explanation: "Sự suy thoái là 'một bước ngắn' nguy hiểm khôn lường... đe dọa trực tiếp đến sự tồn vong của Đảng và chế độ."
  },
  {
    id: 15,
    question: "Mục tiêu tổng quát mà Đảng lãnh đạo đất nước thực hiện là gì?",
    options: [
      "Dân giàu, nước mạnh, xã hội hiện đại.",
      "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh.",
      "Hòa bình, độc lập, thống nhất.",
      "Tự do, bình đẳng, bác ái."
    ],
    correctAnswer: 1,
    explanation: "Mục tiêu là: dân giàu, nước mạnh, dân chủ, công bằng, văn minh."
  }
];