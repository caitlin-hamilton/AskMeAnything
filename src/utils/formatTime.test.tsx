import formatTime from "../utils/formatTime";

describe("Format Time Test Over Different Hour", () => {
  let result:string;

    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date(1641304800000)) //Current time is 14:00
    })

  test("Test at current time", () => {
    result = formatTime(1641304800000)
    expect(result).toBe("0 sec. ago")
  });

  test("Test at 5 seconds before the hour", () => {
    result = formatTime(1641304795000)
    expect(result).toBe("5 sec. ago")
  });

  test("Test 30 mins ago", () => {
    result = formatTime(1641303001000)
    expect(result).toBe("30 min. ago")
  });

  test("Test 1.5 hours ago", () => {
    result = formatTime(1641299401000)
    expect(result).toBe("1 hr. ago")
  });

  test("Test 23 hours ago", () => {
    result = formatTime(1641214801000)
    expect(result).toBe("1 day ago")
  });
})

describe("Format Time Test Over Same Hour", () => {
  let result:string;
  
    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date(1641304920000)); //Current time is 14:02
    })

  test("Test at one min ago", () => {
    result = formatTime(1641304860000)
    expect(result).toBe("1 min. ago")
  });

})
