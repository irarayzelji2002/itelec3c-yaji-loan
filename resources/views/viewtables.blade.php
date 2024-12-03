<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <style>
        .bg-green { background-color: #d4edda; }
        .text-green { color: #155724; }
        .btn-green { background-color: #57DF98; border-color: #57DF98; font-weight: bold}
        .btn-green:hover { background-color: #043C3C; border-color: #043C3C; font-weight: bold; color: white;}
        .table-green { background-color: #c3e6cb; }
        .card-header-green { background-color: #043C3C; color: white; }
        .form-control, .btn { border-radius: 0.25rem; }
        .table th, .table td { vertical-align: middle; }
    </style>
    <title>Bank Loan Application</title>
</head>
<body class="bg-green">
  <div class="container mt-5">


    <div class="card mb-4">
      <div class="card-header card-header-green">
        <h2>Create New Loan</h2>
      </div>
      <div class="card-body">
        <form action="{{ route('loan.store') }}" method="POST" class="bg-white p-4 rounded shadow-sm" enctype="multipart/form-data">
            @csrf
            <div class="mb-3">
                <label for="borrower_id" class="form-label">Borrower ID</label>
                <input type="text" class="form-control" id="borrower_id" name="borrower_id" required>
            </div>
            <div class="mb-3">
                <label for="loan_amount" class="form-label">Loan Amount</label>
                <input type="number" class="form-control" id="loan_amount" name="loan_amount" required>
            </div>
            <div class="mb-3">
                <label for="interest_rate" class="form-label">Interest Rate</label>
                <input type="number" step="0.01" class="form-control" id="interest_rate" name="interest_rate" required>
            </div>
            <div class="mb-3">
                <label for="loan_term" class="form-label">Loan Term</label>
                <input type="text" class="form-control" id="loan_term" name="loan_term" required>
            </div>
            <div class="mb-3">
                <label for="date_applied" class="form-label">Date Applied</label>
                <input type="date" class="form-control" id="date_applied" name="date_applied" required>
            </div>
            <div class="mb-3">
                <label for="date_approved" class="form-label">Date Approved</label>
                <input type="date" class="form-control" id="date_approved" name="date_approved">
            </div>
            <div class="mb-3">
                <label for="date_disbursed" class="form-label">Date Disbursed</label>
                <input type="date" class="form-control" id="date_disbursed" name="date_disbursed">
            </div>
            <div class="mb-3">
                <label for="outstanding_balance" class="form-label">Outstanding Balance</label>
                <input type="number" step="0.01" class="form-control" id="outstanding_balance" name="outstanding_balance" required>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Product Image</label>
                <input type="file" name="image" class="form-control" accept="image/*" required>
            </div>
            <button type="submit" class="btn btn-green">Submit</button>
        </form>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header card-header-green">
        <h2>Create New Payment</h2>
      </div>
      <div class="card-body">
        <form action="{{ route('payment.store') }}" method="POST" class="bg-white p-4 rounded shadow-sm" enctype="multipart/form-data">
            @csrf
            <div class="mb-3">
                <label for="payment_amount" class="form-label">Payment Amount</label>
                <input type="number" class="form-control" id="payment_amount" name="payment_amount" required>
            </div>
            <div class="mb-3">
                <label for="payment_date" class="form-label">Payment Date</label>
                <input type="date" class="form-control" id="payment_date" name="payment_date" required>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Payment Image</label>
                <input type="file" name="image" class="form-control" accept="image/*" required>
            </div>
            <button type="submit" class="btn btn-green">Submit</button>
        </form>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header card-header-green">
        <h2>Create New Loan Type</h2>
      </div>
      <div class="card-body">
        <form action="{{ route('loan_type.store') }}" method="POST" class="bg-white p-4 rounded shadow-sm" enctype="multipart/form-data">
            @csrf
            <div class="mb-3">
                <label for="loan_type_name" class="form-label">Loan Type Name</label>
                <input type="text" class="form-control" id="loan_type_name" name="loan_type_name" required>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" name="description" required></textarea>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Loan Type Image</label>
                <input type="file" name="image" class="form-control" accept="image/*" required>
            </div>
            <button type="submit" class="btn btn-green">Submit</button>
        </form>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header card-header-green">
        <h2>Search Loans</h2>
      </div>
      <div class="card-body">
        <form class="d-flex justify-content-between" action="{{ route('view.loan') }}" method="GET">
          <div class="col-auto flex-grow-1 me-2">
            <input class="form-control" type="search" placeholder="Search..." value="{{ request('search') }}" name="search">
          </div>
          <button type="submit" class="btn btn-green">Search</button>
        </form>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header card-header-green">
        <h2>Loan Table</h2>
      </div>
      <div class="card-body">
        <table class="table table-green table-hover">
          <thead>
            <tr>
              <th scope="col">Loan ID</th>
              <th scope="col">Borrower ID</th>
              <th scope="col">Loan Amount</th>
              <th scope="col">Interest Rate</th>
              <th scope="col">Loan Term</th>
              <th scope="col">Date Applied</th>
              <th scope="col">Date Approved</th>
              <th scope="col">Date Disbursed</th>
              <th scope="col">Outstanding Balance</th>
              <th scope="col">Image</th>
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
              <td><img src="{{ asset('storage/'.$loan->image_path) }}" alt="Loan Image" width="100"></td>
            </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header card-header-green">
        <h2>Search Payments</h2>
      </div>
      <div class="card-body">
        <form class="d-flex justify-content-between" action="{{ route('view.loan') }}" method="GET">
          <div class="col-auto flex-grow-1 me-2">
            <input class="form-control" type="search" placeholder="Search..." value="{{ request('search_payment') }}" name="search_payment">
          </div>
          <button type="submit" class="btn btn-green">Search</button>
        </form>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header card-header-green">
        <h2>Payment Table</h2>
      </div>
      <div class="card-body">
        <table class="table table-green table-hover">
          <thead>
            <tr>
              <th scope="col">Loan ID</th>
              <th scope="col">Payment Amount</th>
              <th scope="col">Payment Date</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody>
            @foreach($payment_model as $payment)
            <tr>
              <td>{{ $payment->loan_id }}</td>
              <td>{{ $payment->payment_amount }}</td>
              <td>{{ $payment->payment_date }}</td>
              <td><img src="{{ asset('storage/'.$payment->image_path) }}" alt="Payment Image" width="100"></td>
            </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header card-header-green">
        <h2>Search Loan Types</h2>
      </div>
      <div class="card-body">
        <form class="d-flex justify-content-between" action="{{ route('view.loan') }}" method="GET">
          <div class="col-auto flex-grow-1 me-2">
            <input class="form-control" type="search" placeholder="Search..." value="{{ request('search_loan_type') }}" name="search_loan_type">
          </div>
          <button type="submit" class="btn btn-green">Search</button>
        </form>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header card-header-green">
        <h2>Loan Type Table</h2>
      </div>
      <div class="card-body">
        <table class="table table-green table-hover">
          <thead>
            <tr>
              <th scope="col">Loan Type Name</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody>
            @foreach($Loan_Model as $loanType)
            <tr>
              <td>{{ $loanType->loan_type_name }}</td>
              <td>{{ $loanType->description }}</td>
              <td><img src="{{ asset('storage/'.$loanType->image_path) }}" alt="Loan Type Image" width="100"></td>
            </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>