import { Target, Users, Landmark, ShieldAlert } from "lucide-react";
import type { ContentSection, QuizQuestion } from "../types";

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: 1,
    title: "Kiên định mục tiêu và con đường cách mạng",
    subtitle:
      "Nguyên tắc sống còn đối với chế độ và sự phát triển của Việt Nam.",
    points: [
      "Tính tất yếu: Tiến tới CNXH là phù hợp với khát vọng nhân dân và sự lựa chọn của Bác.",
      "Bài học cốt lõi: Nắm vững ngọn cờ độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
      "Nhiệm vụ: Giải quyết hài hòa mối quan hệ giữa đổi mới, ổn định và phát triển, giữa kinh tế thị trường và định hướng XHCN.",
    ],
    highlight: "Độc lập dân tộc gắn liền với Chủ nghĩa xã hội",
    icon: Target,
    pic: "/images/N4.png",
  },
  {
    id: 2,
    title: "Phát huy sức mạnh dân chủ xã hội chủ nghĩa",
    subtitle: "Bản chất chế độ: Của dân, do dân, vì dân.",
    points: [
      "Bảo đảm tất cả quyền lực nhà nước thuộc về nhân dân.",
      "Thực hiện nghiêm túc phương châm: Dân biết, dân bàn, dân làm, dân kiểm tra.",
      "Dân chủ phải đi đôi với kỷ cương, phép nước; gắn liền với hệ thống pháp luật.",
    ],
    highlight: "Dân biết, dân bàn, dân làm, dân kiểm tra",
    icon: Users,
    pic: "/images/image001-5363.jpg",
  },
  {
    id: 3,
    title: "Kiện toàn hệ thống chính trị",
    subtitle: "Công cụ đắc lực để thực hiện quyền làm chủ của nhân dân.",
    points: [
      "Tính nhất nguyên: Đặt dưới sự lãnh đạo duy nhất của Đảng Cộng sản Việt Nam.",
      "Cấu trúc: Đảng lãnh đạo, Nhà nước quản lý, Mặt trận và các đoàn thể làm nòng cốt.",
      "Yêu cầu: Xây dựng hệ thống trong sạch, vững mạnh để bảo vệ Tổ quốc và thực thi dân chủ.",
    ],
    highlight: "Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ",
    icon: Landmark,
    pic: "/images/bac-ho.jpg",
  },
  {
    id: 4,
    title: "Đấu tranh chống suy thoái",
    subtitle: "Nhiệm vụ then chốt trong công tác xây dựng Đảng hiện nay.",
    points: [
      "Nguy cơ: Sự suy thoái về tư tưởng, đạo đức có thể dẫn đến 'tự diễn biến', 'tự chuyển hóa'.",
      "Cảnh báo của Bác: Đây là những 'căn bệnh' nguy hiểm đe dọa sự tồn vong của chế độ.",
      "Giải pháp: Thực hiện Nghị quyết TW4, đẩy lùi tham nhũng, lãng phí, quan liêu.",
    ],
    highlight: "Chống tự diễn biến, tự chuyển hóa",
    icon: ShieldAlert,
    pic: "/images/bac-ho2.jpg",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      "Mục tiêu tổng quát của cách mạng Việt Nam trong giai đoạn hiện nay được Đảng ta xác định là gì?",
    options: [
      "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh, vững bước đi lên chủ nghĩa xã hội.",
      "Độc lập dân tộc và chủ nghĩa xã hội.",
      "Xóa đói giảm nghèo, đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước.",
      "Xây dựng thành công Chủ nghĩa xã hội với một nền kinh tế thị trường hiện đại.",
    ],
    correctAnswer: 0,
    explanation:
      "Đây là mục tiêu tổng quát được Đảng Cộng sản Việt Nam xác định, thể hiện sự vận dụng và phát triển sáng tạo tư tưởng Hồ Chí Minh về Độc lập dân tộc gắn liền với Chủ nghĩa xã hội.",
  },
  {
    id: 2,
    question:
      "Việc Đảng và Nhà nước ta khẳng định phải phát triển kinh tế thị trường định hướng xã hội chủ nghĩa thể hiện sự vận dụng tư tưởng Hồ Chí Minh nào về mục tiêu xây dựng đất nước?",
    options: [
      "Kết hợp sức mạnh dân tộc với sức mạnh thời đại.",
      "Đoàn kết toàn dân tộc.",
      "Lấy mục tiêu 'làm cho dân giàu nước mạnh' là tiêu chí quan trọng.",
      "Độc lập dân tộc là tiền đề để tiến lên chủ nghĩa xã hội.",
    ],
    correctAnswer: 2,
    explanation:
      "Kinh tế thị trường định hướng xã hội chủ nghĩa là cách thức để phát triển lực lượng sản xuất, làm cho dân giàu, nước mạnh, phù hợp với tinh thần Hồ Chí Minh về mục tiêu của độc lập và tự do.",
  },
  {
    id: 3,
    question: "Đặc điểm nổi bật của hệ thống chính trị Việt Nam là gì?",
    options: [
      "Tam quyền phân lập.",
      "Đa nguyên, đa đảng.",
      "Tính nhất nguyên và thống nhất dưới sự lãnh đạo của Đảng.",
      "Phi chính trị hóa lực lượng vũ trang.",
    ],
    correctAnswer: 2,
    explanation:
      "Hệ thống chính trị Việt Nam có tính nhất nguyên về chính trị, tổ chức, tư tưởng dưới sự lãnh đạo của Đảng.",
  },
  {
    id: 4,
    question:
      "Nguy cơ nào được xem là bước ngắn dẫn đến 'tự diễn biến', 'tự chuyển hóa'?",
    options: [
      "Tụt hậu về kinh tế.",
      "Thiên tai và dịch bệnh.",
      "Suy thoái về tư tưởng chính trị, đạo đức, lối sống.",
      "Sự cạnh tranh gay gắt của thị trường quốc tế.",
    ],
    correctAnswer: 2,
    explanation:
      "Sự suy thoái về tư tưởng chính trị, đạo đức, lối sống là nguyên nhân trực tiếp dẫn đến tự diễn biến, tự chuyển hóa.",
  },
  {
    id: 5,
    question:
      "Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH được bổ sung, phát triển vào năm nào?",
    options: ["Năm 1986", "Năm 2001", "Năm 2011", "Năm 2021"],
    correctAnswer: 2,
    explanation: "Cương lĩnh 1991 được bổ sung, phát triển năm 2011.",
  },
  {
    id: 6,
    question:
      "Việc Đảng ta xác định phát triển văn hóa, xây dựng con người là mục tiêu và động lực của phát triển là sự vận dụng và phát triển tư tưởng nào của Hồ Chí Minh?",
    options: [
      "Nắm vững lý luận chủ nghĩa Mác - Lênin.",
      "Chủ nghĩa xã hội phải có con người xã hội chủ nghĩa.",
      "Xây dựng khối liên minh công - nông - trí thức.",
      "Thực hiện đại đoàn kết toàn dân tộc.",
    ],
    correctAnswer: 1,
    explanation:
      "Hồ Chí Minh coi văn hóa, đạo đức là nền tảng tinh thần, con người là yếu tố trung tâm và quan trọng nhất để xây dựng xã hội mới.",
  },
  {
    id: 7,
    question:
      "Trong bối cảnh hội nhập, việc Đảng ta chủ trương 'chủ động, tích cực hội nhập quốc tế toàn diện, sâu rộng' thể hiện sự phát triển sáng tạo tư tưởng Hồ Chí Minh nào?",
    options: [
      "Đoàn kết quốc tế vô sản.",
      "Tự lực cánh sinh là chính.",
      "Độc lập dân tộc là tiền đề của Chủ nghĩa xã hội.",
      "Sự kết hợp giữa sức mạnh dân tộc và sức mạnh thời đại.",
    ],
    correctAnswer: 3,
    explanation:
      "Hội nhập toàn diện, sâu rộng là cách thức mới để kết hợp hiệu quả sức mạnh dân tộc (nội lực) với sức mạnh thời đại (ngoại lực).",
  },
  {
    id: 8,
    question:
      "Vấn đề nào được coi là 'then chốt' để bảo đảm sự gắn bó giữa Độc lập dân tộc và Chủ nghĩa xã hội trong giai đoạn hiện nay?",
    options: [
      "Giữ vững vai trò lãnh đạo của Đảng Cộng sản Việt Nam.",
      "Tăng cường quan hệ với các nước lớn.",
      "Xây dựng nền quốc phòng toàn dân.",
      "Phát triển mạnh mẽ kinh tế tư nhân.",
    ],
    correctAnswer: 0,
    explanation:
      "Sự lãnh đạo của Đảng là nhân tố quyết định, đảm bảo cả hai mục tiêu (Độc lập dân tộc và CNXH) được thực hiện nhất quán, không tách rời",
  },
  {
    id: 9,
    question: "Dân chủ xã hội chủ nghĩa không thể tách rời yếu tố nào?",
    options: [
      "Kinh tế tư nhân.",
      "Hệ thống pháp luật và kỷ cương phép nước.",
      "Sự hỗ trợ của quốc tế.",
      "Công nghệ thông tin.",
    ],
    correctAnswer: 1,
    explanation:
      "Dân chủ không thể tách rời việc hoàn thiện hệ thống pháp luật; dân chủ phải đi đôi với kỷ cương, phép nước.",
  },
  {
    id: 10,
    question: "Hệ thống chính trị bao gồm những thành phần nào?",
    options: [
      "Đảng, Nhà nước, Doanh nghiệp.",
      "Nhà nước, Quân đội, Công an.",
      "Đảng, Nhà nước, Mặt trận Tổ quốc và các đoàn thể chính trị - xã hội.",
      "Quốc hội, Chính phủ, Tòa án.",
    ],
    correctAnswer: 2,
    explanation:
      "Cấu trúc hệ thống bao gồm Đảng, Nhà nước, Mặt trận Tổ quốc và các đoàn thể chính trị - xã hội.",
  },
  {
    id: 11,
    question:
      "Trong vận dụng tư tưởng Hồ Chí Minh, việc xây dựng Khối đại đoàn kết toàn dân tộc trong giai đoạn hiện nay cần phải giải quyết mâu thuẫn cơ bản nào?",
    options: [
      "Mâu thuẫn giữa nông dân và công nhân.",
      "Mâu thuẫn giữa tăng trưởng kinh tế và bảo vệ môi trường.",
      "Mâu thuẫn giữa dân tộc ta và các thế lực thù địch bên ngoài.",
      "Mâu thuẫn giữa lợi ích cá nhân và lợi ích tập thể, lợi ích quốc gia.",
    ],
    correctAnswer: 3,
    explanation:
      "Đảm bảo hài hòa lợi ích cá nhân, tập thể và quốc gia là vấn đề cốt lõi để giữ vững sự đồng thuận và củng cố khối đại đoàn kết trong điều kiện kinh tế thị trường.",
  },
  {
    id: 12,
    question:
      "Điều kiện tiên quyết để nền dân chủ xã hội chủ nghĩa được thực thi là gì?",
    options: [
      "Thu nhập bình quân đầu người cao.",
      "Hiệu quả hoạt động của hệ thống chính trị.",
      "Có nhiều đảng phái chính trị.",
      "Hội nhập quốc tế sâu rộng.",
    ],
    correctAnswer: 1,
    explanation:
      "Hiệu quả hoạt động của hệ thống chính trị là điều kiện tiên quyết để nền dân chủ XHCN được thực thi.",
  },
  {
    id: 13,
    question:
      "Nghị quyết nào của Đảng tập trung vào nhiệm vụ xây dựng, chỉnh đốn Đảng?",
    options: [
      "Nghị quyết Đại hội VI.",
      "Nghị quyết Trung ương 4 khóa XII.",
      "Nghị quyết Trung ương 5 khóa VIII.",
      "Cương lĩnh 2011.",
    ],
    correctAnswer: 1,
    explanation:
      "Cần thực hiện hiệu quả Nghị quyết Trung ương 4 khóa XII về tăng cường xây dựng, chỉnh đốn Đảng.",
  },
  {
    id: 14,
    question:
      "Những 'căn bệnh' như tham nhũng, lãng phí, quan liêu đe dọa trực tiếp đến điều gì?",
    options: [
      "Tốc độ tăng trưởng GDP.",
      "Sự tồn vong của Đảng và chế độ.",
      "Quan hệ ngoại giao.",
      "Ngân sách nhà nước.",
    ],
    correctAnswer: 1,
    explanation:
      "Sự suy thoái là 'một bước ngắn' nguy hiểm khôn lường... đe dọa trực tiếp đến sự tồn vong của Đảng và chế độ.",
  },
  {
    id: 15,
    question: "Mục tiêu tổng quát mà Đảng lãnh đạo đất nước thực hiện là gì?",
    options: [
      "Dân giàu, nước mạnh, xã hội hiện đại.",
      "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh.",
      "Hòa bình, độc lập, thống nhất.",
      "Tự do, bình đẳng, bác ái.",
    ],
    correctAnswer: 1,
    explanation:
      "Mục tiêu là: dân giàu, nước mạnh, dân chủ, công bằng, văn minh.",
  },
];
