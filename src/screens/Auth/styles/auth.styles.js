import { StyleSheet } from 'react-native';
import { colors, container, spacing, fonts, formContainer, input, inputLabel } from '../../../styles/base';
import { button } from '../../../components/buttons/styles/button.styles';

export const auth = StyleSheet.create(
    {
        logInContainer: {
            ...container,
            padding: 30,
            paddingTop: '30%',
            backgroundColor: 'transparent',
            alignItems: 'center',
        },
        regContainer: {
            ...container,
            backgroundColor: 'transparent',
            alignItems: 'center',
        },
        formContainer: {
            ...formContainer,
            alignItems: 'center',
            backgroundColor: colors.WHITE,
        },
        title: {
            fontSize: 27,
            fontFamily: fonts.PRIMARY,
            color: colors.WHITE,
            marginBottom: spacing.LARGE,
            fontWeight: fonts.WEIGHT_LEIGHT,
        },
        text: {
            color: colors.TERTIARY,
            fontSize: 16,
            padding: spacing.MEDIUM,
            marginBottom: spacing.MEDIUM,
            textTransform: 'uppercase',
            fontWeight: fonts.WEIGHT_LEIGHT
        },
        logInButton: {
            ...button.borderBtn,
            backgroundColor: colors.PRIMARY,
            margin: spacing.MEDIUM,
        },
        regButton: {
            ...button.borderBtn,
            backgroundColor: colors.SECONDARY,
            margin: spacing.MEDIUM,
        },
        back: {
            marginLeft: spacing.LARGE
        },
        btnView: {
            marginTop: spacing.LARGE
        }
    });