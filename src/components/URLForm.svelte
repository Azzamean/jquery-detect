<script lang="ts">
  import loadingImg from '../assets/images/loading.svg'
  const action = '/detect.json'
  const method = 'POST'

  let inputUrl = ''
  let version: string | undefined = ''

  let loading = false
  let invalid = false
  let message: string | undefined

  async function submitUrl(url: string) {
    if (!url) {
      invalid = true
      return
    }

    // Reset states
    loading = true
    invalid = false
    message = version = ''

    try {
      const res = await fetch(action, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })
      if (res.ok) {
        const json = await res.json()
        message = json.message
        version = json.version
      } else {
        try {
          const json = await res.json()
          message = json.message
        } catch (e) {
          message = res.statusText
        }
      }
    } catch (error) {
      console.error(error)
      message = 'Error communicating with server. Please refresh and try again.'
    } finally {
      loading = false
    }
  }
</script>

<form class="flex-column" on:submit|preventDefault={() => submitUrl(inputUrl)}>
  <label for="url">URL</label>
  <div class="flex-row input-wrap">
    <input
      required
      bind:value={inputUrl}
      class:invalid
      type="text"
      name="url"
      id="url"
      placeholder="https://"
      on:paste={(e) => {
        const value = e.clipboardData?.getData('text')
        if (value) {
          submitUrl(value)
        }
      }}
    />
    <button type="submit" class="flex-center" class:loading disabled={loading}>
      <img
        src={loadingImg.src}
        alt="loading"
        class="loading-image"
        width={18}
        height={18}
      />
      <span>Detect</span>
    </button>
  </div>
</form>

{#if version}
  <p class="result">Version detected: <code>{version}</code></p>
{:else if message}
  <p class="message">{message}</p>
{:else if !loading && version === undefined}
  <p class="result">No version detected</p>
{/if}

<style>
  .input-wrap {
    gap: 10px;
  }
  input.invalid {
    background-color: rgba(255, 0, 0, 0.1);
  }
  button .loading-image {
    display: none;
    position: absolute;
  }
  button.loading .loading-image {
    display: block;
  }
  button.loading span {
    visibility: hidden;
  }
  .result,
  .message {
    color: var(--success-color);
    padding: 10px 20px;
    background-color: var(--border-color);
    border-radius: var(--border-radius);
  }
  .result {
    font-size: 2em;
  }
</style>
