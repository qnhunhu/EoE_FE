import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function PrivacyPolicy({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chính sách bảo mật</Text>
      <Text style={styles.lastUpdated}>Cập nhật lần cuối: 20/12/2025</Text>
      
      <Text style={styles.heading}>1. Thu thập thông tin</Text>
      <Text style={styles.paragraph}>
        Ứng dụng EggoEgg thu thập các thông tin sau đây để cung cấp dịch vụ tốt nhất cho khách hàng:
        - Thông tin cá nhân: Họ tên, số điện thoại, địa chỉ giao hàng
        - Thông tin thanh toán: Được xử lý thông qua cổng thanh toán bảo mật
        - Thông tin thiết bị: Để tối ưu hóa trải nghiệm người dùng
      </Text>

      <Text style={styles.heading}>2. Sử dụng thông tin</Text>
      <Text style={styles.paragraph}>
        Thông tin của bạn được sử dụng để:
        - Xử lý đơn hàng và giao hàng
        - Hỗ trợ khách hàng
        - Cải thiện chất lượng dịch vụ
        - Gửi thông tin khuyến mãi (nếu bạn đồng ý)
      </Text>

      <Text style={styles.heading}>3. Bảo mật thông tin</Text>
      <Text style={styles.paragraph}>
        Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn bằng các biện pháp bảo mật tiên tiến.
      </Text>

      <Text style={styles.heading}>4. Liên hệ</Text>
      <Text style={styles.paragraph}>
        Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ:
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
    fontSize: 24,
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
