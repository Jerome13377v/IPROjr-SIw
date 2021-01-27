import React, { useState }from 'react';

import { Button, TextInput, View, Dimensions } from 'react-native';
import { Formik } from 'formik';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export const MyReactNativeForm = props => (
    <Formik
        initialValues={{ email: '' }}
        onSubmit={values => console.log(values)}
    >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{marginTop:50}}>
                <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    style={{
                        backgroundColor:'#fff',
                        height:60,
                        fontSize:30,
                        width:screenWidth*0.95,
                        borderRadius:12,
                        alignSelf:'center',
                        padding:15,
                        elevation:10,
                        marginBottom:10,
                    }}
                />
                <Button onPress={handleSubmit} title="Submit"
                style={{
                    backgroundColor:'#fa570a',
                    height:60,
                    fontSize:30,
                    width:screenWidth*0.95,
                    borderRadius:12,
                    alignSelf:'center',
                    padding:15,
                    elevation:10,
                    marginBottom:10,
                }} />
            </View>
        )}
    </Formik>

);