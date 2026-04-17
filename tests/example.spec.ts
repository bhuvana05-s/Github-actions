import{test,expect} from '@playwright/test';
import { log } from 'node:console'



test.describe('Sandbox Basic',()=>{

test('Click, Double Click, Hover, Tooltip, Static Dropdown',async({page})=>{

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')
    await page.getByTestId('single-click-btn').click()
    await expect (page.getByText('Single click completed')).toBeVisible()
    await page.getByTestId('double-click-btn').dblclick()
    await expect(page.getByText('Double click completed')).toBeVisible()
    await page.getByTestId('hover-btn').hover()
    await expect (page.getByText('Hover triggered successfully.')).toBeVisible()
    await page.getByTestId('tooltip-trigger-btn').hover()
    await expect (page.getByTestId('hover-tooltip')).toContainText('Tooltip verified')
    await page.getByTestId('static-practice-select').selectOption('Hard - Dynamic waits and assertions')
    await expect (page.getByText('Static dropdown selected: Hard')).toBeVisible()



})


test('Inputs, Checkbox, Radio, Dropdown  -- assertion : isChecked'  ,async({page})=>{

await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

const name = 'bhuvana'
const email = 'abc@gmail.com'
const course = 'API + UI'

await page.getByTestId('name-input').fill(name)
await page.getByTestId('email-input').fill(email)
await page.getByTestId('track-select').selectOption(course)


const bCheck= await page.getByTestId('remember-checkbox').isChecked()
console.log('state check Befor====>'+ bCheck);
// await page.getByTestId('remember-checkbox').check()

if (bCheck === false){

await page.getByTestId('remember-checkbox').check()

}

const aCheck=await page.getByTestId('remember-checkbox').isChecked()
console.log('state check After====>'+aCheck);

await page.getByTestId('submit-form-btn').click()
//await expect(page.getByTestId('form-status')).toBeVisible()
await expect (page.getByText(`${name} submitted (${email}) for ${course}.`)).toBeVisible() 

})




test(' Drop down , assertion - isDisabled , isVisible, isHidden ' , async({page}) =>{

   // test.setTimeout(180000)  - to make particular test wait for 3 mins to run all scenarios

await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
const check = await page.getByTestId('dynamic-option-select').isDisabled()
console.log('check===> ' +check);
const visible = await page.getByTestId('dynamic-option-select').isVisible()
console.log('Visibe===>' + visible);

const bVisible = await page.getByTestId('hidden-dropdown-select').isVisible()
console.log(bVisible);

if(bVisible === false){

    await page.getByTestId('hidden-dropdown-toggle-btn').click()

}
const aVisible = await page.getByTestId('hidden-dropdown-select').isVisible()
console.log('after click ===>'+aVisible);


const option = 'Hidden - Advanced'

await page.getByTestId('hidden-dropdown-select').selectOption(option)

await expect (page.getByText(`Hidden dropdown selected: ${option}.`)).toBeVisible()  // ----- doubt 


})


test('Static Waits/Dynamic waits  and    Keyboard', async({page})=>{

await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')
await page.getByTestId('async-load-btn').click()
await page.waitForTimeout(20000)            // static waits
await expect(page.getByText('Async result loaded successfully.')).toBeVisible({timeout:250000})  // ASSERTION DYNAMIC WAITS
await page.getByTestId('keyboard-input').type('Veera')
await page.getByTestId('keyboard-input').press('Enter')
await expect(page.getByText('Command submitted: Veera')).toBeVisible()

})

test('Text and Attribute Extraction, textContent, inputValue, getAttribute, allTextContents, and allInnerTexts.' , async({page})=>{
    
    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')
    const value = await page.getByTestId('extract-textcontent-target').innerText()
    console.log("Value===>"+value)
    const value1 = await page.getByTestId('extract-textcontent-target').textContent()
    console.log("Value===>"+value1)

    const inputval = await page.getByTestId('extract-inputvalue-target').inputValue()
    console.log("inputvalue ===>"+inputval)

    const attributeVal = await page.getByTestId('extract-attribute-target').getAttribute('title')
    console.log("attributeVal===>" + attributeVal)

    const allinnertxt = await page.getByTestId('extract-list').allInnerTexts()
    console.log('allinnertxt ===>' +allinnertxt)

    const allcontext    = await page.getByTestId('extract-list').allTextContents()
    console.log("allcontext===> "+ allcontext)

    const val = await  page.getByTestId('extract-list-item').allInnerTexts()
    console.log("value===>"+val)

    const val2   = await  page.getByTestId('extract-list-item').allTextContents()
    console.log("value===>"+val2)


    await page.getByTestId('mark-readops-btn').click()
    await expect(page.getByText('Read operation checks completed.')).toBeVisible()



})

})

