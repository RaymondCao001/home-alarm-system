/**
 * ========================================
 * 
 * BUTTON A
 * 
 * Select a number
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * BUTTON B
 * 
 * Save / Confirm number
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * MOVEMENT SENSOR
 * 
 * Shake while armed = Intruder Alarm
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * A + B
 * 
 * Show security status
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * AUTOMATIC SECURITY CHECK
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * ALARM FLASH
 * 
 * ========================================
 */
/**
 * ========================================
 * 
 * SET PASSWORD
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
 * ----- VARIABLES -----
 */
input.onButtonPressed(Button.A, function () {
    // Only select numbers when setting
    // or entering a password
    if (step <= 2 || step == 3) {
        currentNumber = currentNumber + 1
        if (currentNumber > 9) {
            currentNumber = 0
        }
        basic.showNumber(currentNumber)
    }
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
    // -------------------------
    // SET PASSWORD
    // -------------------------
    // -------------------------
    // ENTER PASSWORD
    // -------------------------
    if (step == 1) {
        // Save first digit
        firstDigit = currentNumber
        basic.showIcon(IconNames.Yes)
        basic.pause(500)
        currentNumber = 0
        step = 2
        basic.showNumber(currentNumber)
    } else if (step == 2) {
        // Save second digit
        // Create two-digit password
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
        // First digit
        // Second digit
        if (enterStep == 1) {
            enteredFirstDigit = currentNumber
            basic.showIcon(IconNames.Yes)
            basic.pause(300)
            currentNumber = 0
            enterStep = 2
            basic.showNumber(currentNumber)
        } else if (enterStep == 2) {
            enteredPassword = enteredFirstDigit * 10 + currentNumber
            // Check password
            if (enteredPassword == Password) {
                basic.showIcon(IconNames.Yes)
                // If alarm is ON,
                // correct PIN turns everything OFF
                // If system is ARMED,
                // correct PIN disarms it
                // If system is OFF,
                // correct PIN arms it
                if (alarm == true) {
                    alarm = false
                    armed = false
                    basic.showString("OFF")
                } else if (armed == true) {
                    armed = false
                    basic.showString("OFF")
                } else {
                    armed = true
                    basic.showString("ARMED")
                }
            } else {
                // Wrong password
                basic.showIcon(IconNames.No)
                basic.showString("WRONG")
            }
            // Reset password entry
            currentNumber = 0
            enterStep = 1
            basic.showNumber(currentNumber)
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    if (armed == true) {
        alarm = true
        basic.showString("ALARM")
    }
})
let enteredPassword = 0
let enteredFirstDigit = 0
let Password = 0
let firstDigit = 0
let armed = false
let alarm = false
let fireAlarm = false
let currentNumber = 0
let enterStep = 0
let step = 0
step = 1
enterStep = 1
let temperatureLimit = 30
let darknessLimit = 30
basic.showString("SET")
basic.showNumber(currentNumber)
loops.everyInterval(1000, function () {
    // Only run after password has been set
    if (step == 3) {
        // -------------------------
        // TEMPERATURE CHECK
        // -------------------------
        if (input.temperature() > temperatureLimit) {
            fireAlarm = true
        } else {
            fireAlarm = false
        }
        // -------------------------
        // AUTO ARM WHEN DARK
        // -------------------------
        if (input.lightLevel() < darknessLimit && armed == false && alarm == false) {
            armed = true
            basic.showString("AUTO ARM")
        }
    }
})
loops.everyInterval(500, function () {
    // Fire alarm
    // Intruder alarm
    if (fireAlarm == true) {
        basic.showIcon(IconNames.Skull)
        music.playTone(988, music.beat(BeatFraction.Eighth))
        basic.clearScreen()
    } else if (alarm == true) {
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
