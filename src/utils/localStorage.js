// Hàm lấy dữ liệu từ localStorage
export const getLocalStorageItem = (itemName) => {
  try {
    const item = JSON.parse(localStorage.getItem(itemName));
    return item;
  } catch (error) {
    // console.error(
    //   `Lỗi khi lấy thông tin từ localStorage cho item ${itemName}:`,
    //   error
    // );
    return null;
  }
};

// Hàm thêm hoặc cập nhật dữ liệu vào localStorage
export const setLocalStorageItem = (itemName, value) => {
  try {
    localStorage.setItem(itemName, JSON.stringify(value));
    console.log(`Đã lưu item ${itemName} vào localStorage.`);
  } catch (error) {
    // console.error(
    //   `Lỗi khi lưu thông tin vào localStorage cho item ${itemName}:`,
    //   error
    // );
  }
};
