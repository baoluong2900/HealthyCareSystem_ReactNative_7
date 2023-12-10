import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.red,
        borderRadius: 14,
        width: '45%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginBottom: 50,
        flex: 1,
      },
      image: {
        width: 30,
        height: 30,
      }
      
});
export default styles;