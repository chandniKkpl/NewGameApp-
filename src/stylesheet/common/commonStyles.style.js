import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';

export default{
    background:{
        flex: 1,
        backgroundColor:'white',
    }, 
    buttonViewBlue: {
        width: '80%',
        backgroundColor: 'rgb(66, 130, 191)',
        borderRadius: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        margin:10
    },
    buttonViewRed: {
        width: '80%',
        backgroundColor: 'rgb(214, 22, 22)',
        borderRadius: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        margin: '5%'
    },
    textBlueButton: {
        color: 'white',
        multiLine: true,
        textAlign: 'center',
        padding: 10
    },
    spaceBottom1x:{
        marginBottom:5,
    },
    spaceBottom2x:{
        marginBottom:10
    }, 
    spaceBottom3x:{
        marginBottom:15
    },
    singleLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'lightgray'
    },

}