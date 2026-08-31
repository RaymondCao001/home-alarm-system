input.onButtonPressed(Button.A, function () {
    // If alarm is active,
    // user is now entering password
    if (alarm == true) {
        enteringPassword = true
    }
    currentNumber = currentNumber + 1
    // After 9, go back to 0
    if (currentNumber > 9) {
        currentNumber = 0
    }
    basic.showNumber(currentNumber)
})
input.onButtonPressed(Button.AB, function () {
    if (fireAlarm == true) {
        basic.showString("FIRE")
    } else if (alarm == true) {
        basic.showString("ALARM")
    } else if (armed == true) {
        basic.showString("ARMED")
    } else {
        basic.showString("OFF")
    }
    basic.pause(500)
    basic.showNumber(currentNumber)
})
input.onButtonPressed(Button.B, function () {
    // ====================================
    // STEP 1
    // SET FIRST PASSWORD DIGIT
    // ====================================
    // ====================================
    // STEP 2
    // SET SECOND PASSWORD DIGIT
    // ====================================
    // ====================================
    // STEP 3
    // ENTER PASSWORD
    // ====================================
    if (step == 1) {
        firstDigit = currentNumber
        basic.showIcon(IconNames.Yes)
        basic.pause(500)
        currentNumber = 0
        step = 2
        basic.showNumber(currentNumber)
    } else if (step == 2) {
        Password = firstDigit * 10 + currentNumber
        basic.showIcon(IconNames.Yes)
        basic.showString("SAVED")
        basic.pause(500)
        // Password setup finished
        step = 3
        currentNumber = 0
        enterStep = 1
        basic.showString("OFF")
        basic.showNumber(currentNumber)
    } else if (step == 3) {
        // Stop alarm display while entering PIN
        if (alarm == true) {
            enteringPassword = true
        }
        // --------------------------------
        // FIRST DIGIT
        // --------------------------------
        // --------------------------------
        // SECOND DIGIT
        // --------------------------------
        if (enterStep == 1) {
            enteredFirstDigit = currentNumber
            basic.showIcon(IconNames.Yes)
            basic.pause(300)
            currentNumber = 0
            enterStep = 2
            basic.showNumber(currentNumber)
        } else if (enterStep == 2) {
            enteredPassword = enteredFirstDigit * 10 + currentNumber
            // ============================
            // CORRECT PASSWORD
            // ============================
            // ============================
            // WRONG PASSWORD
            // ============================
            if (enteredPassword == Password) {
                basic.showIcon(IconNames.Yes)
                // Alarm active:
                // correct PIN stops alarm
                // System armed:
                // correct PIN disarms
                // System off:
                // correct PIN arms
                if (alarm == true) {
                    alarm = false
                    armed = false
                    enteringPassword = false
                    basic.showString("OFF")
                } else if (armed == true) {
                    armed = false
                    basic.showString("OFF")
                } else {
                    armed = true
                    basic.showString("ARMED")
                }
            } else {
                basic.showIcon(IconNames.No)
                basic.showString("WRONG")
                // If alarm was active,
                // start alarm again
                if (alarm == true) {
                    enteringPassword = false
                }
            }
            // =================================
            // RESET PASSWORD ENTRY
            // =================================
            currentNumber = 0
            enterStep = 1
            basic.pause(500)
            if (alarm == false) {
                basic.showNumber(currentNumber)
            }
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    // Only trigger ONCE:
    // system must be armed
    // AND alarm must currently be off
    if (armed == true && alarm == false) {
        alarm = true
        enteringPassword = false
        // Show ALARM only once
        basic.showString("ALARM")
    }
})
/**
 * ========================================
 * 
 * BUTTON A
 * 
 * Select number
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * BUTTON B
 * 
 * Confirm / Save number
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * SHAKE
 * 
 * Intruder detection
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * BUTTON A + B
 * 
 * Show security status
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * TEMPERATURE CHECK
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * FIRE ALARM
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * INTRUDER ALARM
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * START - SET PASSWORD
 * 
 * ========================================
 */
/**
 * ========================================
 */
/**
 * SMART HOME SECURITY SYSTEM
 */
/**
 * ========================================
 */
/**
 * ========================================
 */
/**
 * VARIABLES
 */
/**
 * ========================================
 */
let enteredPassword = 0
let enteredFirstDigit = 0
let Password = 0
let firstDigit = 0
let armed = false
let fireAlarm = false
let enteringPassword = false
let alarm = false
let currentNumber = 0
let enterStep = 0
let step = 0
step = 1
enterStep = 1
let temperatureLimit = 30
basic.showString("SET")
basic.showNumber(currentNumber)
loops.everyInterval(1000, function () {
    if (input.temperature() > temperatureLimit) {
        fireAlarm = true
    } else {
        fireAlarm = false
    }
})
loops.everyInterval(500, function () {
    // Do not interrupt password entry
    if (fireAlarm == true && enteringPassword == false) {
        basic.showIcon(IconNames.Skull)
        music.playTone(988, music.beat(BeatFraction.Eighth))
        basic.clearScreen()
    }
})
loops.everyInterval(500, function () {
    // Alarm keeps flashing and sounding
    // until correct password is entered
    if (alarm == true && enteringPassword == false) {
        basic.showLeds(`
            . # # # .
            . # # # .
            . # # # .
            . # # # .
            # # # # #
            `)
        music.playTone(784, music.beat(BeatFraction.Eighth))
        basic.clearScreen()
    }
})
