import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Constants
const { width, height } = Dimensions.get('window');

const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',
    success: '#00C851',
    error: '#ff4444',
    black: "#171717",
    white: "#FFFFFF",
    background: "#252C4A"
};

const SIZES = {
    base: 10,
    width,
    height
};

// Quiz Data
const data = [
    {
        question: "What is the name of the famous lake located in Nagpur?",
        options: ["Futala Lake", "Lagad Dhokla", "Khindsi Lake", "Shivaji Lake"],
        correct_option: "Futala Lake"
    },
    {
        question: "Which temple in Nagpur is dedicated to Lord Rama?",
        options: ["Ram Mandir", "Deekshabhoomi", "Shri Ganesh Mandir", "Kachner Jain Temple"],
        correct_option: "Ram Mandir"
    },
    {
        question: "What is Nagpur known as due to its oranges?",
        options: ["Orange City", "Fruit City", "Spice City", "Mango City"],
        correct_option: "Orange City"
    },
    {
        question: "Which historical monument in Nagpur was built during the British rule?",
        options: ["Sitabuldi Fort", "Nagpur Central Museum", "Rambagh Palace", "Zero Mile"],
        correct_option: "Sitabuldi Fort"
    },
    {
        question: "What is the name of the largest biodiversity park in Nagpur?",
        options: ["Futala Biodiversity Park", "Nagpur Biodiversity Park", "Ambazari Park", "Botanical Garden"],
        correct_option: "Futala Biodiversity Park"
    }
];

const Level3Screen = () => {
    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [progress, setProgress] = useState(new Animated.Value(0));

    // Validate selected answer
    const validateAnswer = (selectedOption) => {
        const correct_option = allQuestions[currentQuestionIndex].correct_option;
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption === correct_option) {
            setScore(score + 1);
        }
        setShowNextButton(true);
    };

    // Handle next button
    const handleNext = () => {
        if (currentQuestionIndex === allQuestions.length - 1) {
            setShowScoreModal(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            resetQuestionState();
        }
    };

    // Reset state for the next question
    const resetQuestionState = () => {
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
    };

    // Restart the quiz
    const restartQuiz = () => {
        setShowScoreModal(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        resetQuestionState();
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };

    // Progress animation effect
    useEffect(() => {
        Animated.timing(progress, {
            toValue: currentQuestionIndex,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }, [currentQuestionIndex]);

    // Interpolating the progress bar width
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    });

    // Render the progress bar
    const renderProgressBar = () => (
        <View style={{ width: '100%', height: 20, borderRadius: 20, backgroundColor: '#00000020' }}>
            <Animated.View style={[{ height: 20, borderRadius: 20, backgroundColor: COLORS.accent }, { width: progressAnim }]} />
        </View>
    );

    // Render the question text
    const renderQuestion = () => (
        <View style={{ marginVertical: 40 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={{ color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2 }}>{currentQuestionIndex + 1}</Text>
                <Text style={{ color: COLORS.white, fontSize: 18, opacity: 0.6 }}>/ {allQuestions.length}</Text>
            </View>
            <Text style={{ color: COLORS.white, fontSize: 30 }}>
                {allQuestions[currentQuestionIndex]?.question}
            </Text>
        </View>
    );

    // Render the answer options
    const renderOptions = () => (
        <View>
            {allQuestions[currentQuestionIndex]?.options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => validateAnswer(option)}
                    disabled={isOptionsDisabled}
                    style={{
                        borderWidth: 3,
                        borderColor: option === correctOption
                            ? COLORS.success
                            : option === currentOptionSelected
                                ? COLORS.error
                                : 'rgba(30, 144, 255, 0.25)', // Using rgba for transparency
                        backgroundColor: option === correctOption
                            ? 'rgba(0, 200, 81, 0.2)' // Success color with transparency
                            : option === currentOptionSelected
                                ? 'rgba(255, 68, 68, 0.2)' // Error color with transparency
                                : 'rgba(30, 144, 255, 0.2)', // Secondary color with transparency
                        height: 60,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        marginVertical: 10
                    }}
                >
                    <Text style={{ fontSize: 20, color: COLORS.white }}>{option}</Text>
                    {option === correctOption ? (
                        <View style={{
                            width: 30, height: 30, borderRadius: 15,
                            backgroundColor: COLORS.success,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <MaterialCommunityIcons name="check" style={{ color: COLORS.white, fontSize: 20 }} />
                        </View>
                    ) : option === currentOptionSelected ? (
                        <View style={{
                            width: 30, height: 30, borderRadius: 15,
                            backgroundColor: COLORS.error,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <MaterialCommunityIcons name="close" style={{ color: COLORS.white, fontSize: 20 }} />
                        </View>
                    ) : null}
                </TouchableOpacity>
            ))}
        </View>
    );

    // Render the next button
    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <TouchableOpacity
                    activeOpacity={0.7} // Button feedback on press
                    onPress={handleNext}
                    style={{
                        marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
                    }}
                >
                    <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Next</Text>
                </TouchableOpacity>
            );
        }
        return null;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <View style={{ flex: 1, paddingVertical: 40, paddingHorizontal: 16, backgroundColor: COLORS.background }}>
                {renderProgressBar()}
                {renderQuestion()}
                {renderOptions()}
                {renderNextButton()}

                {/* Score Modal */}
                <Modal animationType="slide" transparent={true} visible={showScoreModal}>
                    <View style={{
                        flex: 1, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroundColor: COLORS.white, width: '90%', borderRadius: 20, padding: 20, alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                                {score > (allQuestions.length / 2) ? 'Congratulations!' : 'Oops!'}
                            </Text>
                            <View style={{
                                flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 30, color: score > (allQuestions.length / 2) ? COLORS.success : COLORS.error
                                }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/ {allQuestions.length}</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7} // Button feedback
                                onPress={restartQuiz}
                                style={{
                                    backgroundColor: COLORS.accent, padding: 20, width: '100%', borderRadius: 20
                                }}
                            >
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Retry Quiz</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default Level3Screen;
