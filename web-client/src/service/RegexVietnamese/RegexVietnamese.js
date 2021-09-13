export const checkVietnamese = (string) => {
  console.log(string);
  try {
    const PATTERN =
    "^[A-Za-z0-9_@./+,.!-ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐđĨŨƠzàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (string === null) return false;
    console.log(string.match(PATTERN));
    return string.match(PATTERN);
  } catch (error) {
    console.log(error);
  }
};
