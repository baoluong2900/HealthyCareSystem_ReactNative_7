import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.white,
    },
    footer: {
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
    },
    image: {
        width: '100%',
        height: height * 0.45,
        backgroundColor: colors.lightGrey,
    },
    content: {
       backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: -20,
        paddingHorizontal: 24,
    },
    title: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: '500',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    rating: {
        marginTop: 5,
        paddingVertical: 2,
        alignSelf: 'flex-start'
    },
    description: {
        color: colors.textGrey,
        fontWeight: '300',
        marginVertical: 8,
    },
    bookmarkContainer: {
        backgroundColor: colors.lightGrey,
        padding: 18,
        borderRadius: 8,
        marginRight: 16,
    },
    bookmarkIcon: {
        width: 24,
        height: 24,
    },
    backContainer: {
        backgroundColor: colors.white,
        padding: 10,
        margin: 24,
        borderRadius: 8,
        marginRight: 16,
        position: 'absolute',
    },
    viewButton: {
        flex: 1,
    },
    backIcon: {
        width: 20,
        height: 20,
    }
});
export default styles;