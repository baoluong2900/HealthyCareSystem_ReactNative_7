import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },
    title: {
        color: colors.textGrey,
        paddingVertical: 8,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 20,
        backgroundColor: colors.lightGrey,
    },
    price: {
        color: colors.textGrey,
        paddingBottom: 8,
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 8,
    },
    content: {
        flex: 1,
    },
    rowEnd: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Adjust this to your needs
    },
    time: {
        color: colors.textGrey,
    }
});
export default styles;