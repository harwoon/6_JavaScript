
window.onload = function () {//페이지가 전부 로드되었다면. 전체가 다 열렸을 때
    const ssn1 = document.getElementById("ssn1")
    ssn1.addEventListener("keyup", () => {
        if (ssn1.value.length >= 6) {
            document.getElementById("ssn2").focus()
        }

    })

    const ssn = document.querySelectorAll(".ssn")
    ssn.forEach((s)=>{
        console.log(s)
        s.addEventListener("input",()=>{ //수정이 일어난다면
            document.getElementById("ssncheck").value = "n"
        })
    })
}

function sendit() {
    const userid = document.getElementById("userid")
    const userpw = document.getElementById("userpw")
    const userpw_re = document.getElementById("userpw_re")
    const username = document.getElementById("name")
    const userphone = document.getElementById("hp")
    const useremail = document.getElementById("email")
    const ssncheck = document.getElementById("ssncheck")

    const expIdText = /^[A-Za-z0-9]{4,20}$/
    const expPwText = /^(?=.*[A-za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,20}$/
    const expNameText = /^[가-힣]+$/
    const expHpText = /^\d{3}-\d{3,4}-\d{4}$/
    const expEmailText = /^[A-Za-z0-9\-\.]+@[A-Za-z0-9\-]+\.[A-Za-z]+$/ //email에 들어갈 수 있는 특수문자는 -과 .뿐
    /*
        (?=.*): 어디엔가 원하는 패턴이 하나라도 있어야 함
        (?=.*[A-za-z]): 영문자가 최소 1개 이상 있어야 함
        (?=.*\d): 숫자가 최소 1개 이상 있어야 함
        (?=.*!@#$%^&*()): 제시된 특수 문자가 최소 1개 이상 있어야 함
    */

    //html과 순서 맞추는게 좋음
    if (userid.value === "") { //아이디 입력하지 않았을 때
        alert("아이디를 입력하세요")
        userid.focus()
        return false
    }

    if (!expIdText.test(userid.value)) { //통과하지 못하면 조건문으로 들어옴
        alert('아이디는 4자 이상 20자 이하의 영문자 또는 숫자로 입력하세요')
        userid.focus()
        return false
    }

    if (!expPwText.test(userpw.value)) {
        alert('비밀번호는 8자 이상 20자 이하의 영문자,숫자,특수문자를 한 자 이상 꼭 포함해야합니다')
        userpw.focus()
        return false
    }

    if (userpw.value != userpw_re.value) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다')
        userpw_re.focus()
        return false
    }

    if (!expNameText.test(username.value)) {
        alert('이름은 한글로 입력하세요')
        username.focus()
        return false
    }

    if (!expHpText.test(userphone.value)) {
        alert('휴대폰번호 형식이 일치하지 않습니다.\n 하이픈을 꼭 입력하세요')
        userphone.focus()
        return false
    }

    if (!expEmailText.test(useremail.value)) {
        alert('이메일 형식이 일치하지 않습니다.')
        useremail.focus()
        return false
    }

    if (ssncheck.value == "n") {
        alert("주민등록번호 검증버튼을 눌러주세요")
        return false
    }
}

function checkSsn() {
    // const ssn1 = document.getElementById("ssn1") // "001011"
    // const ssn2 = document.getElementById("ssn2") // "3068518"

    // const ssn1V = ssn1.value
    // const ssn2V = ssn2.value

    // let num = 2
    // let sum = 0

    // for (let idx = 0; idx < 6; idx++) {
    //     sum += ssn1V[idx] * num
    //     num++
    // }

    // num = 8

    // for (let idx = 0; idx < 6; idx++) {
    //     sum += ssn2V[idx] * num
    //     num++

    //     if (num == 10) {
    //         num = 2
    //     }
    // }

    // let res = sum % 11


    // if (res >= 10) {
    //     res = res % 10
    // }

    // res = 11 - res

    // if (res == ssn2V[6]) {
    //     alert('인증을 완료했습니다.')
    //     return true
    // }
    // else {
    //     alert('인증에 실패했습니다.')
    //     ssn1.focus()
    //     return false
    // }

    let ssncheck = document.getElementById("ssncheck")
    const ssn1 = document.getElementById("ssn1") // "001011"
    const ssn2 = document.getElementById("ssn2") // "3068518"
    const ssn = ssn1.value + ssn2.value

    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]
    let result = 0

    for (let i = 0; i < weights.length; i++) {
        result += parseInt(ssn[i] * weights[i]) //parseInt 사실 필요없음
    }
    result = (11 - (result % 11)) % 10

    if (result == parseInt(ssn[12])) {
        alert("유효한 주민등록번호입니다!")
        ssncheck.value = "y"
    }
    else {
        alert("유효하지 않은 주민등록번호입니다!")
    }

}
