import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function TermsAndConditions({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Điều khoản và điều kiện sử dụng</Text>
      <Text style={styles.lastUpdated}>Có hiệu lực từ: 20/12/2025</Text>
      
      <Text style={styles.heading}>1. Giới thiệu</Text>
      <Text style={styles.paragraph}>
        Chào mừng bạn đến với EggoEgg - Ứng dụng đặt trứng sạch trực tuyến. Bằng việc sử dụng ứng dụng này, bạn đồng ý với các điều khoản và điều kiện dưới đây.
      </Text>

      <Text style={styles.heading}>2. Điều kiện đặt hàng</Text>
      <Text style={styles.paragraph}>
        - Đơn hàng được xác nhận qua điện thoại trước khi giao.
        - Thời gian giao hàng từ 1-3 ngày làm việc tùy khu vực.
        - Chúng tôi chỉ giao hàng trong phạm vi thành phố Hồ Chí Minh.
      </Text>

      <Text style={styles.heading}>3. Chính sách thanh toán</Text>
      <Text style={styles.paragraph}>
        - Thanh toán khi nhận hàng (COD)
        - Chấp nhận thanh toán qua chuyển khoản ngân hàng
        - Hóa đơn VAT được cung cấp theo yêu cầu
      </Text>

      <Text style={styles.heading}>4. Chính sách đổi trả</Text>
      <Text style={styles.paragraph}>
        - Đổi trả trong vòng 24h nếu sản phẩm bị hư hỏng, ấp nở.
        - Không áp dụng đổi trả đối với sản phẩm đã qua sử dụng.
      </Text>

      <Text style={styles.heading}>5. Quyền sở hữu trí tuệ</Text>
      <Text style={styles.paragraph}>
        Mọi nội dung trên ứng dụng bao gồm logo, hình ảnh, văn bản đều thuộc bản quyền của EggoEgg.
      </Text>

      <Text style={styles.heading}>6. Liên hệ</Text>
      <Text style={styles.paragraph}>
        Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ:
        Email: support@eggoegg.com
        Hotline: 1900 1234
      </Text>

      <Button 
        mode="contained" 
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        Quay lại
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  lastUpdated: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#444',
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#FFA000',
  },
});
