const quotes: any = [
  "Code chạy được rồi, giờ thì cầu nguyện thôi. 🙏",
  "Phần mềm không có lỗi là phần mềm không có người dùng. 😅",
  "90% lập trình là than phiền vì code cũ, 10% còn lại là tạo ra code mà người khác sẽ than phiền. 🤣",
  "Nếu gỡ lỗi là quá trình xóa bug, thì lập trình hẳn là quá trình tạo bug! 🐞",
  "Chỉ cần sửa một dòng code, là 10 bug mới sẽ xuất hiện. 🐛🐛🐛",
  "Lập trình là nghề duy nhất mà người ta gọi mình khi hệ thống sập! 🔧💻",
  "Không phải lỗi tại code đâu, do… Internet đấy! 🌐😅",
  "Debugging: 10 phút suy nghĩ và 2 giờ tự hỏi tại sao lại có lỗi. 🤯",
  "Câu thần chú của dân IT: Chắc do server rồi! 🧙‍♂️💾",
  "Deadline thật ra chỉ là một lời khuyên. 🤭",
  "Đôi khi code xong mà chạy được là nhờ phép màu. ✨🧑‍💻",
  "Chạy đúng được một lần không có nghĩa là sẽ chạy đúng lần hai. 🏃‍♂️",
  "Nếu không biết sửa lỗi, chỉ cần hỏi 'Sếp ơi, restart server được không?' 😜",
  "Muốn biết code có lỗi không, cứ để sếp chạy thử. 👀",
  "Cái gì không sửa được bằng code, thì chắc chắn do lỗi phần cứng. 😂",
  "Khi không thể tìm được lỗi thì hãy thêm câu lệnh in ra màn hình. 👨‍💻",
  "Nếu đã thấy hết bug thì hãy kiểm tra lại. 🐛",
  "Lập trình viên có hai loại deadline: không thể nào xong và gần xong. 🕰️😆",
  "Càng sửa, càng sai. 🤦‍♂️",
  "Thêm người vào dự án không làm cho dự án xong nhanh hơn, chỉ tăng thêm số bug. 😂",
  "Hầu hết thời gian coding là để tìm lỗi ở dòng code không phải của mình. 👨‍💻",
  "Phát triển phần mềm là chạy đua với lỗi. 🏃‍♂️💻",
  "Khi code không chạy, thì hãy… đi ngủ. 🛌💻",
  "Tối ưu code là việc chỉ thực hiện khi không còn gì để làm. 🤷‍♂️",
];

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export { getRandomQuote };
