<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <title>Document</title>
</head>
<body>
<table class="table table-dark table-hover">
<h1>Loan Table</h1>
  <thead>
    <tr>
      <th scope="col">
       Loan ID
      </th>
        <th scope="col">
            Borrower ID
        </th>
        <th scope="col">
            Loan Amount
        </th>
        <th scope="col">
            Interest Rate
        </th>
        <th scope="col">
            Loan Term
        </th>
        <th scope="col">
            Date Applied
        </th>
     
        <th scope="col">
            Date Approved
        </th>
        <th scope="col">
            Date Disbursed
        </th>
        <th scope="col">
        Outstanding Balance 
        </th>
    </tr>
  </thead>
  <tbody>
    @foreach($Loan as $loan)
    <tr>
      <td>{{ $loan->loan_id }}</td>
      <td>{{ $loan->borrower_id }}</td>
      <td>{{ $loan->loan_amount }}</td>
      <td>{{ $loan->interest_rate }}</td>
      <td>{{ $loan->loan_term }}</td>
      <td>{{ $loan->date_applied }}</td>
      <td>{{ $loan->date_approved }}</td>
      <td>{{ $loan->date_disbursed }}</td>
      <td>{{ $loan->outstanding_balance }}</td>
    </tr>
    @endforeach
  </tbody>
</table>

<table class="table table-dark table-hover">
<h1>Payment Table</h1>
  <thead>
    <tr>
    
        <th scope="col">
            Loan ID
        </th>
        <th scope="col">
            Payment Amount
        </th>
        <th scope="col">
            Payment Date
        </th>
    </tr>
  </thead>
  <tbody>
    @foreach($payment_model as $payment)
    <tr>
  
      <td>{{ $payment->loan_id }}</td>
      <td>{{ $payment->payment_amount }}</td>
      <td>{{ $payment->payment_date }}</td>
    </tr>
    @endforeach
  </tbody>
</table>

<table class="table table-dark table-hover">
<h1>Loan Type Table</h1>
  <thead>
    <tr>
     
        <th scope="col">
            Loan Type Name
        </th>
        <th scope="col">
            Description
        </th>
    </tr>
  </thead>
  <tbody>
    @foreach($Loan_Model as $loanType)
    <tr>
      
      <td>{{ $loanType->loan_type_name }}</td>
      <td>{{ $loanType->description }}</td>
    </tr>
    @endforeach
  </tbody>
</table>
  
  </tbody>
</table>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>