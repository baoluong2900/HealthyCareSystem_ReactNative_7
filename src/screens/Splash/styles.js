import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: colors.white,
    },
    image: {
        width: '100%',
        height: 350,
    },
    titleContainer: {
        marginVertical: 65,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    innerTitle: {
        color: colors.orange,
        textDecorationLine: 'underline',
    },
    footerText: {
        color: colors.blue,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
    },
    buttonCont: { width: '100%', flexDirection: 'row' },
});
export default styles;