function getTotal()
{
  var total=0;
  if(document.donorForm.donationAmt)
  {
    if(typeof document.donorForm.donationAmt.length === 'undefined')
    {
      var value = document.donorForm.euroCents ? document.donorForm.donationAmt.value + decimalEq +  document.donorForm.euroCents.value : document.donorForm.donationAmt.value;
      total = conditionValue(value);
    }
    else
    {
      for(var i=0;i<document.donorForm.donationAmt.length;i++)
      {
        if(document.donorForm.donationAmt[i].checked)
        {
          if(document.donorForm.donationAmt[i].value != 'otherAmt'){ total = conditionValue(document.donorForm.donationAmt[i].value);}
          else
          {
            var value = document.donorForm.euroCents ? document.donorForm.otherAmt.value + decimalEq +  document.donorForm.euroCents.value : document.donorForm.otherAmt.value;
            total = conditionValue(value);
          }
        }
      }
    }
  }
  else
  {
    var value = document.donorForm.euroCents ? document.donorForm.otherAmt.value + decimalEq +  document.donorForm.euroCents.value : document.donorForm.otherAmt.value;
    total = conditionValue(value);
  }

  var donationAmount = formatForDisplay(total);
  document.donorForm.amount.value = donationAmount;
}
